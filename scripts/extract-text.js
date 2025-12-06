#!/usr/bin/env node

import { PDFParse } from 'pdf-parse';
import fs from 'fs';

async function run() {
    // Get the PDF path from command line arguments
    const pdfPath = process.argv[2];

    if (!pdfPath) {
        console.error('Usage: node main.js <path-to-pdf>');
        process.exit(1);
    }

    // Check if the file exists
    if (!fs.existsSync(pdfPath)) {
        console.error(`Error: File not found: ${pdfPath}`);
        process.exit(1);
    }

    try {
        // Read the PDF file
        console.log(`Reading PDF: ${pdfPath}`);
        const dataBuffer = fs.readFileSync(pdfPath);
        const parser = new PDFParse({ data: dataBuffer });

        // Extract text
        const result = await parser.getText();

        // Create output filename (replace .pdf with .txt)
        const outputPath = pdfPath.replace(/\.pdf$/i, '.txt');
        
        // Write to text file
        fs.writeFileSync(outputPath, result.text);
        console.log(`Text extracted successfully to: ${outputPath}`);
    } catch (error) {
        console.error(`Error processing PDF: ${error.message}`);
        process.exit(1);
    }
}

run();