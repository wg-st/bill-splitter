import type { Parser } from "~/types/parser";
import { CoopParser } from "./coopParser";
import { MigrosParser } from "./migrosParser";

export const parserRegistry: Record<string, new (text: string) => Parser> = {
  coop: CoopParser,
  migros: MigrosParser,
};

export const getParserTypeFromFilename = (filename: string): string => {
  const lowerFilename = filename.toLowerCase();
  for (const prefix of Object.keys(parserRegistry)) {
    if (lowerFilename.startsWith(prefix)) {
      return prefix;
    }
  }
  throw new Error(`No parser found for filename: ${filename}`);
};

export const getParserForFilename = (
  filename: string,
  text: string
): Parser => {
  const ParserClass = parserRegistry[getParserTypeFromFilename(filename)];
  return new ParserClass(text);
};
