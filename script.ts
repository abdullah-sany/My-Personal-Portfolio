import fs from 'fs';
import path from 'path';

function replaceInFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/text-white/g, 'text-app-text');
  content = content.replace(/text-gray-400/g, 'text-muted-text');
  content = content.replace(/text-gray-300/g, 'text-app-text\/80');
  content = content.replace(/text-gray-200/g, 'text-app-text\/90');
  content = content.replace(/text-gray-100/g, 'text-app-text');
  content = content.replace(/text-gray-500/g, 'text-muted-text\/80');
  content = content.replace(/bg-white\/5/g, 'bg-app-card');
  content = content.replace(/bg-white\/10/g, 'bg-glass-panel');
  content = content.replace(/border-white\/10/g, 'border-app-border');
  content = content.replace(/border-white\/5/g, 'border-app-border');
  content = content.replace(/bg-black\/40/g, 'bg-app-card\/60');
  content = content.replace(/bg-black\/20/g, 'bg-app-card\/40');
  content = content.replace(/bg-white/g, 'bg-app-text');
  content = content.replace(/text-black/g, 'text-app-bg');
  content = content.replace(/text-gray-600/g, 'text-muted-text\/60');

  fs.writeFileSync(filePath, content, 'utf-8');
}

const dir = './src/components';
const files = fs.readdirSync(dir);
for (const file of files) {
  if (file.endsWith('.tsx') && file !== "Navbar.tsx" && file !== "BackgroundEffects.tsx") {
    replaceInFile(path.join(dir, file));
  }
}
replaceInFile('./src/App.tsx');
