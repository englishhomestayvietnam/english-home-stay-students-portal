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

filesToUpdate.forEach(file => {
  const filePath = path.join(componentsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace obj?.url with (obj?.imagekit?.url || obj?.url) for image fields
    content = content.replace(/([a-zA-Z0-9_]+(?:\?\.)?(?:image|photo|poster|problem_image|solution_image))\?\.url/g, "($1?.imagekit?.url || $1?.url)");
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated url fetching in ${file}`);
  }
});
