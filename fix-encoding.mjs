import fs from 'fs';

const replacements = [
  ['Ã±', 'ñ'], ['Ã³', 'ó'], ['Ã­', 'í'], ['Ã¡', 'á'], ['Ã©', 'é'],
  ['Ãº', 'ú'], ['Ã¼', 'ü'], ['Ã¨', 'è'], ['Ã ', 'à'], ['Ã²', 'ò'],
  ['Ã§', 'ç'], ['Ã¤', 'ä'], ['Ã¶', 'ö'], ['Ã"', 'Ó'], ['Ã‰', 'É'],
  ['Ã', 'Á'], ['Ã\x91', 'Ñ'], ['Ã€', 'À'], ['Ã„', 'Ä'], ['Ã–', 'Ö'],
  ['Ãœ', 'Ü'], ['Ã‡', 'Ç'], ['Â¿', '¿'], ['Â¡', '¡'], ['Â·', '·'],
  ['Âº', 'º'], ['Âª', 'ª']
];

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const [bad, good] of replacements) {
    if (content.includes(bad)) {
      content = content.split(bad).join(good);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed: ' + file);
  } else {
    console.log('OK: ' + file);
  }
});
