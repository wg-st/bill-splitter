import type { BillItem } from "./bill";

export interface Parser {
  isType(): boolean;
  extractBillItems(): BillItem[];
}
