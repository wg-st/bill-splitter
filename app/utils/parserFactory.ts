import { PDFParse } from "pdf-parse";
import type { Parser } from "~/types/parser";
import { CoopParser } from "./coopParser";

const workerUrl =
  "https://cdn.jsdelivr.net/npm/pdf-parse@latest/dist/pdf-parse/web/pdf.worker.mjs";

export class ParserFactory {
  private text = "";

  constructor(private file: File) {}

  async getParsers(): Promise<Parser[]> {
    await this.loadText();
    return [new CoopParser(this.text)];
  }

  private async loadText() {
    if (this.text == "") {
      const data = await this.file.arrayBuffer();
      PDFParse.setWorker(workerUrl);
      const parser = new PDFParse({ data });
      const parsed = await parser.getText();
      this.text = parsed.text;
    }
  }
}
