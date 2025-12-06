import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { extractBillItems } from './fileParsing';
import type { BillItem } from '~/types/bill';

const parsedPdfTextDir = join(__dirname, 'parsed-receipt-pdfs');

describe('extractBillItems', () => {
  const files = readdirSync(parsedPdfTextDir).filter(f => f.endsWith('.txt'));
  
  describe.each(files)('%s', (filename) => {
    it(`should extract bill items matching the solution for ${filename}`, () => {
      const filePath = join(parsedPdfTextDir, filename);
      const content = readFileSync(filePath, 'utf-8');
      
      const solutionPath = filePath.replace('.txt', '.solution.json');
      const expectedItems: BillItem[] = JSON.parse(readFileSync(solutionPath, 'utf-8'));
      
      const actualItems = extractBillItems(content);
      
      expect(actualItems).toHaveLength(expectedItems.length);
      
      actualItems.forEach((item, index) => {
        expect(item.name).toBe(expectedItems[index].name);
        expect(item.price).toBeCloseTo(expectedItems[index].price, 2);
      });
    });
  });
});
