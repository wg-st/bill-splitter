import type { Parser } from "~/types/parser";
import { BaseParser } from "./baseParser";
import type { BillItem } from "~/types/bill";

export class MigrosParser extends BaseParser implements Parser {
  isType(): boolean {
    return true;
  }

  extractBillItems = (): BillItem[] => {
    return [];
  };
}
