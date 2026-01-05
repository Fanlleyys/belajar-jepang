const fs = require('fs');
const path = require('path');

const dest = 'dist';

// Remove dist if exists
if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
}
fs.mkdirSync(dest);

const items = fs.readdirSync('.');

items.forEach(item => {
    // Ignore list
    if (['node_modules', '.git', '.github', 'dist', 'package.json', 'package-lock.json', 'README.md', 'vercel.json', 'build.js', '.gitignore'].includes(item)) return;

    const srcPath = path.join('.', item);
    const destPath = path.join(dest, item);

    try {
        const stat = fs.statSync(srcPath);
        if (stat.isDirectory()) {
            // Recursive copy for directories (if any added later)
            fs.cpSync(srcPath, destPath, { recursive: true });
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    } catch (err) {
        console.error(`Error copying ${item}:`, err);
    }
});

console.log('Build complete: Files copied to dist/');
