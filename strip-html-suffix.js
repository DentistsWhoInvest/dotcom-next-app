const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'out');

function removeHtmlExtension(dir) {
    const files = fs.readdirSync(dir)
    
    files.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            console.log(`Checking directory: ${file}`);
            if (file === '_next' || file === 'static') {
                return;
            }
            // Recursively process subdirectories
            removeHtmlExtension(fullPath);
        } else if (file.endsWith('.html')) {
            // Rename the .html file by removing its extension
            if (file === 'index.html' || file === "404.html") return;
            const newFilename = file.replace(/\.html$/, '');
            if (files.includes(newFilename)) {
                console.error(`Error: ${newFilename} already exists, must be index page.`);
                fs.renameSync(fullPath, path.join(dir, newFilename, 'index.html'));
            } else {
                const newFile = path.join(dir, newFilename);
                fs.renameSync(fullPath, newFile);
            }
        }
    });
}

// Start renaming from the base output directory
removeHtmlExtension(directory);
