import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { extractBillItems } from '../app/utils/fileParsing';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const parsedPdfTextDir = join(__dirname, '../app/utils/parsed-pdf-text');
const files = readdirSync(parsedPdfTextDir).filter(f => f.endsWith('.txt'));

files.forEach(filename => {
  const filePath = join(parsedPdfTextDir, filename);
  const content = readFileSync(filePath, 'utf-8');
  
  const items = extractBillItems(content);
  
  const solutionPath = filePath.replace('.txt', '.solution.json');
  writeFileSync(solutionPath, JSON.stringify(items, null, 2), 'utf-8');
  
  console.log(`Generated solution for ${filename}: ${items.length} items`);
});

console.log('\nDone! Generated solution files for all text files.');
