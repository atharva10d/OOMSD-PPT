const fs = require('fs');
const path = require('path');

const slidesDir = path.join(__dirname, 'slides');
const files = fs.readdirSync(slidesDir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const filePath = path.join(slidesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('scaler.js')) {
        content = content.replace('</body>', '<script src="../assets/scaler.js"></script>\n</body>');
        fs.writeFileSync(filePath, content, 'utf8');
    }
}
console.log('Injection complete');
