import fs from 'fs';
import path from 'path';

const componentsDir = path.resolve('components', 'sections');
const filesToUpdate = [
  'WhyEnglish.tsx',
  'Week.tsx',
  'Volunteers.tsx',
  'Testimonials.tsx',
  'Story.tsx',
  'Hero.tsx',
  'Gallery.tsx'
];

const fallbackUrl = 'https://picsum.photos/seed/placeholder/800/600';

filesToUpdate.forEach(file => {
  const filePath = path.join(componentsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all variations of picsum.photos/seed/...
    content = content.replace(/https:\/\/picsum\.photos\/seed\/[a-zA-Z0-9\/\$\{\}\_\-\+]+/g, fallbackUrl);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated placeholders in ${file}`);
  }
});
