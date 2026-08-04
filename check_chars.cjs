const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const regex = /[^\x00-\x7F·ÈÌÛ˙¡…Õ”⁄Ò—ø°Ä]/g;
let found = {};
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    const char = match[0];
    if (!found[char]) found[char] = [];
    found[char].push(content.substring(Math.max(0, match.index - 15), Math.min(content.length, match.index + 15)));
  }
}
for (const char in found) {
  console.log('CHAR: ' + char + ' (Code: ' + char.charCodeAt(0).toString(16) + ')');
  console.log(found[char].slice(0, 3).join('\n'));
  console.log('---');
}
