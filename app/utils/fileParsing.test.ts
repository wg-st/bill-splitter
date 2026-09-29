import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { parserRegistry, getParserTypeFromFilename } from "./parserRegistry";
import type { BillItem } from "~/types/bill";

const parsedPdfTextDir = join(__dirname, "parsed-receipt-pdfs");

describe("Bill parsing", () => {
  const files = readdirSync(parsedPdfTextDir).filter((f) => f.endsWith(".txt"));

  describe("Parser type detection", () => {
    describe.each(files)("%s", (filename) => {
      it(`should correctly identify the parser type for ${filename}`, () => {
        const filePath = join(parsedPdfTextDir, filename);
        const content = readFileSync(filePath, "utf-8");
        const expectedParserType = getParserTypeFromFilename(filename);

        for (const [parserType, ParserClass] of Object.entries(
          parserRegistry
        )) {
          const parser = new ParserClass(content);
          const isCorrectType = parser.isType();

          if (parserType === expectedParserType) {
            expect(isCorrectType).toBe(true);
          } else {
            expect(isCorrectType).toBe(false);
          }
        }
      });
    });
  });

  describe("Bill item extraction", () => {
    describe.each(files)("%s", (filename) => {
      it(`should extract bill items matching the solution for ${filename}`, () => {
        const filePath = join(parsedPdfTextDir, filename);
        const content = readFileSync(filePath, "utf-8");

        const solutionPath = filePath.replace(".txt", ".solution.json");
        const expectedItems: BillItem[] = JSON.parse(
          readFileSync(solutionPath, "utf-8")
        );

        // Use the correct parser based on filename
        const parserType = getParserTypeFromFilename(filename);
        const ParserClass = parserRegistry[parserType];
        const parser = new ParserClass(content);
        const actualItems = parser.extractBillItems();

        expect(actualItems).toHaveLength(expectedItems.length);

        actualItems.forEach((item, index) => {
          expect(item.name).toBe(expectedItems[index].name);
          expect(item.price).toBeCloseTo(expectedItems[index].price, 2);
        });
      });
    });
  });
});
