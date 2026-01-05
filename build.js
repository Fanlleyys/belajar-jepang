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
            // Special handling for index4.html to inject API Key
            if (item === 'index4.html') {
                let content = fs.readFileSync(srcPath, 'utf8');
                const apiKey = process.env.VITE_GEMINI_API_KEY || '';
                // Inject key if available
                if (apiKey) {
                    console.log('Injecting VITE_GEMINI_API_KEY into index4.html');
                    // We look for the line: let GEMINI_API_KEY = localStorage.getItem...
                    // And prepend the injection or replace empty string fallback
                    // Strategy: Replace `|| ""` with `|| "${apiKey}" || ""` to be safe, or just set it.
                    // Actually, let's look for a placeholder or just inject it as a slightly higher priority default

                    // Use regex to match with any indentation
                    const regex = /let\s+GEMINI_API_KEY\s*=\s*localStorage\.getItem\('user_gemini_api_key'\)\s*\|\|\s*"";/;
                    if (regex.test(content)) {
                        content = content.replace(
                            regex,
                            `let GEMINI_API_KEY = "${apiKey}" || localStorage.getItem('user_gemini_api_key') || "";`
                        );
                        console.log('Successfully injected API Key');
                    } else {
                        console.warn('Could not find GEMINI_API_KEY definition line to replace!');
                    }
                }
                fs.writeFileSync(destPath, content);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    } catch (err) {
        console.error(`Error copying ${item}:`, err);
    }
});

console.log('Build complete: Files copied to dist/');
