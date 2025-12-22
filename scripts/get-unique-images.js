const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const galleryPath = path.join(__dirname, '../public/gallery');
const files = fs.readdirSync(galleryPath);

const imageExtensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];
const imageFiles = files.filter(file => 
  imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
);

const hashMap = new Map();
const uniqueImages = [];

imageFiles.forEach(filename => {
  const filePath = path.join(galleryPath, filename);
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');
  
  if (!hashMap.has(hash)) {
    hashMap.set(hash, filename);
    uniqueImages.push({
      filename,
      hash,
      path: `/gallery/${filename}`
    });
  } else {
    console.log(`Duplicate found: ${filename} (same as ${hashMap.get(hash)})`);
  }
});

// Sort by filename
uniqueImages.sort((a, b) => a.filename.localeCompare(b.filename));

console.log(`\nTotal images: ${imageFiles.length}`);
console.log(`Unique images: ${uniqueImages.length}`);
console.log(`Duplicates removed: ${imageFiles.length - uniqueImages.length}\n`);

// Output JSON for use in the gallery page
const output = {
  images: uniqueImages.map(img => img.path)
};

fs.writeFileSync(
  path.join(__dirname, '../public/gallery/images.json'),
  JSON.stringify(output, null, 2)
);

console.log('Generated public/gallery/images.json');

