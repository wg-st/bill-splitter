import { PDFParse } from "pdf-parse";
import type { BillItem } from "../types/bill";
import type { Parser } from "~/types/parser";



export abstract class BaseParser implements Parser {
  protected text: string;

  constructor(text: string) {
    this.text = text;
  }

  abstract isType(): boolean;
  abstract extractBillItems(): BillItem[];
}
