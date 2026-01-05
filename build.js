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
            // Special handling for HTML files to inject API Key
            const htmlFilesWithGemini = ['index4.html', 'index5.html', 'index6.html', 'index8.html'];
            if (htmlFilesWithGemini.includes(item)) {
                let content = fs.readFileSync(srcPath, 'utf8');
                const apiKey = process.env.VITE_GEMINI_API_KEY || '';

                if (apiKey) {
                    console.log(`Injecting VITE_GEMINI_API_KEY into ${item}`);
                    let injected = false;

                    // Pattern 1: let GEMINI_API_KEY = localStorage.getItem('user_gemini_api_key') || "";
                    const regex1 = /let\s+GEMINI_API_KEY\s*=\s*localStorage\.getItem\('user_gemini_api_key'\)\s*\|\|\s*"";/;
                    if (regex1.test(content)) {
                        content = content.replace(
                            regex1,
                            `let GEMINI_API_KEY = "${apiKey}" || localStorage.getItem('user_gemini_api_key') || "";`
                        );
                        injected = true;
                    }

                    // Pattern 2: const GEMINI_API_KEY = "any_existing_value";
                    const regex2 = /const\s+GEMINI_API_KEY\s*=\s*"[^"]*";/g;
                    if (regex2.test(content)) {
                        content = content.replace(
                            regex2,
                            `const GEMINI_API_KEY = "${apiKey}";`
                        );
                        injected = true;
                    }

                    // Pattern 3: For index4.html's getGeminiApiUrl function - already handles localStorage fallback
                    // No change needed, the function already checks localStorage first

                    if (injected) {
                        console.log(`Successfully injected API Key into ${item}`);
                    } else {
                        console.warn(`Could not find GEMINI_API_KEY definition in ${item}!`);
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
