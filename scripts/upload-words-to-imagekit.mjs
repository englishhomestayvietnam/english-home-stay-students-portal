import fs from 'fs';
import path from 'path';

const PUBLIC_WORDS_DIR = path.join(process.cwd(), 'public', 'words');
const WORDS_JSON_PATH = path.join(process.cwd(), 'lib', 'data', 'ehv-words.json');

const privateKey = (process.env.IMAGEKIT_PRIVATE_KEY || '').trim();
const endpoint = (process.env.IMAGEKIT_ENDPOINT || 'https://ik.imagekit.io/ufokpcpfi/').trim().replace(/\/$/, '');

if (!privateKey) {
  console.error('Missing IMAGEKIT_PRIVATE_KEY in environment');
  process.exit(1);
}

const authHeader = 'Basic ' + Buffer.from(privateKey + ':').toString('base64');

async function uploadFileWithRetry(localFilePath, targetFileName, maxRetries = 4) {
  const fileBuffer = fs.readFileSync(localFilePath);

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const fd = new FormData();
      fd.append('file', new Blob([fileBuffer]), targetFileName);
      fd.append('fileName', targetFileName);
      fd.append('folder', '/words');
      fd.append('useUniqueFileName', 'false');
      fd.append('overwriteFile', 'true');

      const res = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        headers: {
          Authorization: authHeader,
        },
        body: fd,
      });

      if (res.ok) {
        const data = await res.json();
        return data.url;
      }

      const errText = await res.text();
      if (attempt === maxRetries) {
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }
    } catch (err) {
      if (attempt === maxRetries) {
        throw err;
      }
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }
}

async function main() {
  const wordsData = JSON.parse(fs.readFileSync(WORDS_JSON_PATH, 'utf8'));
  const allLocalFiles = fs.existsSync(PUBLIC_WORDS_DIR) ? fs.readdirSync(PUBLIC_WORDS_DIR) : [];

  // Map lowercase filename -> actual local filename on disk
  const diskFileMap = new Map();
  for (const f of allLocalFiles) {
    diskFileMap.set(f.toLowerCase(), f);
  }

  // Prioritize the 487 images actively used in ehv-words.json, then the rest
  const usedLowerNames = new Set(
    wordsData.map((w) => path.basename(w.image).toLowerCase())
  );

  const orderedFiles = [
    ...[...usedLowerNames].filter((lower) => diskFileMap.has(lower)),
    ...[...diskFileMap.keys()].filter((lower) => !usedLowerNames.has(lower)),
  ];

  console.log(
    `Uploading ${orderedFiles.length} total files (${usedLowerNames.size} active in ehv-words.json) to ImageKit ${endpoint}/words/...`
  );

  let completed = 0;
  let failed = 0;
  const CONCURRENCY = 20;
  let index = 0;

  async function worker() {
    while (index < orderedFiles.length) {
      const currentIdx = index++;
      const lowerName = orderedFiles[currentIdx];
      const diskName = diskFileMap.get(lowerName);
      const fullPath = path.join(PUBLIC_WORDS_DIR, diskName);

      try {
        await uploadFileWithRetry(fullPath, lowerName);
        completed++;
        if (completed % 100 === 0 || completed === orderedFiles.length) {
          console.log(`Progress: ${completed}/${orderedFiles.length} uploaded...`);
        }
      } catch (err) {
        failed++;
        console.error(`Failed to upload ${diskName}:`, err.message);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  console.log(`Upload finished: ${completed} succeeded, ${failed} failed.`);

  if (failed > 0) {
    console.error('Some files failed to upload; keeping local public/words folder.');
    process.exit(1);
  }

  // Update lib/data/ehv-words.json to point to ImageKit URLs
  const updatedWords = wordsData.map((item) => {
    const fileName = path.basename(item.image).toLowerCase();
    return {
      ...item,
      image: `${endpoint}/words/${fileName}`,
    };
  });

  fs.writeFileSync(WORDS_JSON_PATH, JSON.stringify(updatedWords, null, 2) + '\n', 'utf8');
  console.log(`Updated ${updatedWords.length} word entries in lib/data/ehv-words.json to use ${endpoint}/words/...`);

  // Remove local public/words directory now that all files are safely on ImageKit
  fs.rmSync(PUBLIC_WORDS_DIR, { recursive: true, force: true });
  console.log('Removed local public/words directory.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

