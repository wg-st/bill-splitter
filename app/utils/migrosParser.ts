import type { Parser } from "~/types/parser";
import { BaseParser } from "./baseParser";
import type { BillItem } from "~/types/bill";

const articleHeader = "Artikelbezeichnung";
const totalKey = "Total CHF";
const separatorLine = "---";

export class MigrosParser extends BaseParser implements Parser {
  isType(): boolean {
    return this.text.toLowerCase().includes("migros");
  }

  extractBillItems = (): BillItem[] => {
    const lines = this.text.split("\n");
    const items: BillItem[] = [];

    let inItemSection = false;

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.includes(articleHeader)) {
        inItemSection = true;
        continue;
      }

      if (trimmed.startsWith(separatorLine) || trimmed.startsWith(totalKey)) {
        break;
      }

      if (!inItemSection || !trimmed) {
        continue;
      }

      const item = this.parseItemLine(trimmed);
      if (item) {
        items.push(item);
      }
    }

    return items;
  };

  private parseItemLine = (line: string): BillItem | null => {
    const parts = line
      .split(/\s+/)
      .map((p) => p.trim())
      .filter((p) => p);

    if (parts.length < 2) {
      return null;
    }

    const totalPrice = parseFloat(parts[parts.length - 2]);

    if (isNaN(totalPrice) || totalPrice === 0) {
      return null;
    }

    let nameEndIndex = parts.length - 2;

    for (let i = parts.length - 2; i >= 0; i--) {
      const part = parts[i];
      const parsed = parseFloat(part);

      if (isNaN(parsed) || /[a-zA-Z]/.test(part)) {
        nameEndIndex = i;
        break;
      }
    }

    const nameParts = parts.slice(0, nameEndIndex + 1);
    const name = nameParts.join(" ");

    if (!name || !/[a-zA-Z]/.test(name)) {
      return null;
    }

    return {
      name: name,
      price: totalPrice,
    };
  };
}
