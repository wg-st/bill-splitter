import type { Bill } from "~/types/bill";
import { ParserFactory } from "./parserFactory";
import type { Parser } from "~/types/parser";

export const parseBill = async (file: File): Promise<Bill> => {
  const parserFacotry = new ParserFactory(file);
  const parsers = await parserFacotry.getParsers();

  let matchingParser: Parser | null = null;

  for (const condidateParser of parsers) {
    if (condidateParser.isType()) {
      matchingParser = condidateParser;
      break;
    }
  }
  if (matchingParser) {
    const items = matchingParser.extractBillItems();
    return { items };
  } else {
    return { items: [] };
  }
};

