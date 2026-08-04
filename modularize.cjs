const fs = require('fs');
const path = require('path');

// Make sure components directory exists
if (!fs.existsSync('components')) {
    fs.mkdirSync('components');
}

// 1. Read index.html as our source of truth for common components
const indexHtml = fs.readFileSync('index.html', 'utf8');

// Helper to extract a block
function extractBlock(startTag, endTag, html) {
    const startIdx = html.indexOf(startTag);
    if (startIdx === -1) return null;
    const endIdx = html.indexOf(endTag, startIdx);
    if (endIdx === -1) return null;
    return html.substring(startIdx, endIdx + endTag.length);
}

// Extract HEAD content (from <head> to </head>)
const headContent = extractBlock('<head>', '</head>', indexHtml);
if (headContent) {
    // Write just the inside of head, or the whole head tag?
    // Let's replace everything between <head> and </head> with <include src="components/head.html"></include>
    // So the component should contain everything inside the <head> tag
    const insideHead = headContent.replace('<head>\\n', '').replace('\\n</head>', '').trim();
    fs.writeFileSync('components/head.html', headContent, 'utf8');
}

// Extract HEADER
const headerContent = extractBlock('    <!-- 1. Header -->\\n\\n            <header class="header">', '</header>', indexHtml);
if (headerContent) {
    fs.writeFileSync('components/header.html', headerContent, 'utf8');
}

// Extract FOOTER
const footerContent = extractBlock('    <!-- 16. Footer -->\\n    <footer class="footer">', '</footer>', indexHtml);
if (footerContent) {
    fs.writeFileSync('components/footer.html', footerContent, 'utf8');
}

// Extract WHATSAPP
const whatsappContent = extractBlock('    <!-- 17. WhatsApp Float -->\\n    <a href="https://api.whatsapp.com/send', '</a>', indexHtml);
if (whatsappContent) {
    fs.writeFileSync('components/whatsapp.html', whatsappContent, 'utf8');
}

// Helper to process a file and replace the extracted blocks with includes
function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    if (headContent && content.includes('<head>')) {
        // More robust head replacement
        const localHead = extractBlock('<head>', '</head>', content);
        if (localHead) {
            content = content.replace(localHead, '<head>\\n    <include src="components/head.html"></include>\\n</head>');
            changed = true;
        }
    }

    if (headerContent && content.includes('<header class="header">')) {
        const localHeader = extractBlock('            <header class="header">', '</header>', content) || 
                            extractBlock('    <!-- 1. Header -->\\n\\n            <header class="header">', '</header>', content) ||
                            extractBlock('<header class="header">', '</header>', content);
        if (localHeader) {
            // Also remove the preceding comment if exists
            content = content.replace(/\\s*<!-- 1\\. Header -->\\s*/, '\\n    ');
            content = content.replace(localHeader, '<include src="components/header.html"></include>');
            changed = true;
        }
    }

    if (footerContent && content.includes('<footer class="footer">')) {
        const localFooter = extractBlock('<footer class="footer">', '</footer>', content);
        if (localFooter) {
            content = content.replace(/\\s*<!-- 16\\. Footer -->\\s*/, '\\n    ');
            content = content.replace(localFooter, '<include src="components/footer.html"></include>');
            changed = true;
        }
    }

    if (whatsappContent && content.includes('class="whatsapp-float"')) {
        const localWa = extractBlock('<a href="https://api.whatsapp.com/send', '</a>', content);
        if (localWa) {
            content = content.replace(/\\s*<!-- 17\\. WhatsApp Float -->\\s*/, '\\n    ');
            content = content.replace(localWa, '<include src="components/whatsapp.html"></include>');
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated ' + filePath);
    }
}

// Process all HTML files
function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist' && file !== 'components') {
                processDirectory(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            processFile(fullPath);
        }
    }
}

processDirectory('.');
console.log('HTML modularization complete!');
