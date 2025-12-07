import type { Bill, BillItem } from "~/types/bill";
import { PDFParse } from "node_modules/pdf-parse/dist/pdf-parse/esm/PDFParse";

const workerUrl = 'https://cdn.jsdelivr.net/npm/pdf-parse@latest/dist/pdf-parse/web/pdf.worker.mjs';
const articleHeader = 'Artikel';
const quantityHeader = 'Menge';
const priceHeader = 'Preis';
const totalKey = 'Total CHF';

export const parseBill = async (file: File): Promise<Bill> => {
  const data = await file.arrayBuffer();
  PDFParse.setWorker(workerUrl);
  const parser = new PDFParse({data});
  const parsed = await parser.getText();

  const items = extractBillItems(parsed.text);
  return { items };
};

export const extractBillItems = (text: string): BillItem[] => {
  const lines = text.split('\n');
  const items: BillItem[] = [];
  
  let inItemSection = false;
  
  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.includes(articleHeader) && trimmed.includes(quantityHeader) && trimmed.includes(priceHeader)) {
      inItemSection = true;
      continue;
    }

    if (trimmed.startsWith(totalKey)) {
      break;
    }
    
    if (!inItemSection || !trimmed) {
      continue;
    }
    
    const item = parseItemLine(trimmed);
    if (item) {
      items.push(item);
    }
  }
  
  return items;
};

const parseItemLine = (line: string): BillItem | null => {
  const parts = line.split(/\t+|\s{2,}/).map(p => p.trim());
  
  const name = parts[0];
  
  let totalPrice = 0;

  for (let i = parts.length-1; i > 0; i--) {
    const part = parts[i];
    const parsed = parseFloat(part);
    if (!isNaN(parsed) && parsed !== 0) { 
      totalPrice = parsed;
      break;
    }
  }
  
  if (!name || totalPrice === 0 || !/[a-zA-Z]/.test(name)) {
    return null;
  }
  
  return {
    name: name,
    price: totalPrice
  };
};