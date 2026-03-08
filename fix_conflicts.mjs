import fs from 'fs';

let content = fs.readFileSync('app/page.tsx', 'utf-8');

// Chunk 1:
// Keep Scene, drop the first div, keep the second div and styles
content = content.replace(/<<<<<<< HEAD\r?\n\s*<div[^>]*>\r?\n\s*<Scene \/>\r?\n=======\r?\n(\s*<div[^>]*>\r?\n\s*<style jsx global>)/, '$1\r\n      <Scene />');
content = content.replace(/>>>>>>> 4da234111a7a6bfabc88870cee708d6325a72ae2\r?\n/g, '');


// Chunk 2:
// Keep only the bottom part
content = content.replace(/<<<<<<< HEAD\r?\n[\s\S]*?=======\r?\n/g, '');

fs.writeFileSync('app/page.tsx', content);
console.log('Fixed page.tsx');
