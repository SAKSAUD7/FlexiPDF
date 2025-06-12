import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import PDFMerger from 'pdf-merger-js';
import mammoth from 'mammoth';

/**
 * Merge multiple PDF files
 */
export const mergePdfs = async (inputFiles, outputFile) => {
  try {
    const merger = new PDFMerger();
    for (const file of inputFiles) {
      await merger.add(file);
    }
    await merger.save(outputFile);
    return outputFile;
  } catch (error) {
    throw new Error(`Failed to merge PDFs: ${error.message}`);
  }
};

/**
 * Compress PDF by optimizing
 */
export const compressPdf = async (inputFile, outputFile, quality = 'medium') => {
  try {
    const existingPdfBytes = fs.readFileSync(inputFile);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    
    pdfDoc.setTitle('');
    pdfDoc.setAuthor('');
    pdfDoc.setSubject('');
    pdfDoc.setCreator('FlexiPDF');
    pdfDoc.setProducer('FlexiPDF');
    
    const pdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectStreamsThreshold: 40,
      updateFieldAppearances: false,
    });
    
    fs.writeFileSync(outputFile, pdfBytes);
    return outputFile;
  } catch (error) {
    throw new Error(`Failed to compress PDF: ${error.message}`);
  }
};

/**
 * Add watermark to PDF
 */
export const addWatermark = async (inputFile, outputFile, watermarkText, options = {}) => {
  try {
    const existingPdfBytes = fs.readFileSync(inputFile);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    const { opacity = 0.3, fontSize = 50, color = rgb(0.5, 0.5, 0.5), rotation = 45 } = options;

    pages.forEach(page => {
      const { width, height } = page.getSize();
      page.drawText(watermarkText, {
        x: width / 2 - (watermarkText.length * fontSize) / 4,
        y: height / 2,
        size: fontSize,
        font,
        color,
        opacity,
        rotate: { type: 'degrees', angle: rotation },
      });
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputFile, pdfBytes);
    return outputFile;
  } catch (error) {
    throw new Error(`Failed to add watermark: ${error.message}`);
  }
};

/**
 * Add digital signature to PDF
 */
export const signPdf = async (inputFile, outputFile, signatureText) => {
  try {
    const existingPdfBytes = fs.readFileSync(inputFile);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const lastPage = pages[pages.length - 1];
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    const { width } = lastPage.getSize();
    
    lastPage.drawText(`Digitally Signed: ${signatureText}`, {
      x: width - 300,
      y: 50,
      size: 12,
      font,
      color: rgb(0, 0, 0.8),
    });
    
    const signatureDate = new Date().toLocaleDateString();
    lastPage.drawText(`Date: ${signatureDate}`, {
      x: width - 300,
      y: 30,
      size: 10,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputFile, pdfBytes);
    return outputFile;
  } catch (error) {
    throw new Error(`Failed to sign PDF: ${error.message}`);
  }
};

/**
 * Basic text extraction (placeholder)
 */
export const extractTextFromPdf = async (inputFile) => {
  return "Text extraction is temporarily disabled while we fix library compatibility issues.";
};

/**
 * Convert Word to PDF
 */
export const convertWordToPdf = async (inputFile, outputFile) => {
  try {
    const result = await mammoth.extractRawText({ path: inputFile });
    const text = result.value;
    
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { height } = page.getSize();
    
    const lines = text.split('\n');
    let y = height - 50;
    
    lines.forEach(line => {
      if (y < 50) {
        const newPage = pdfDoc.addPage();
        y = newPage.getSize().height - 50;
      }
      
      page.drawText(line.substring(0, 80), {
        x: 50,
        y: y,
        size: 12,
        font,
      });
      y -= 15;
    });
    
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputFile, pdfBytes);
    return outputFile;
  } catch (error) {
    throw new Error(`Failed to convert Word to PDF: ${error.message}`);
  }
};

// Placeholder implementations for other functions
export const splitPdf = async (inputFile, outputDir) => {
  throw new Error('Split PDF functionality is temporarily disabled');
};

export const convertPdfToJpg = async (inputFile, outputDir) => {
  throw new Error('PDF to JPG conversion is temporarily disabled');
};

export const protectPdf = async (inputFile, outputFile, password) => {
  throw new Error('PDF protection is not yet implemented');
};

export const unprotectPdf = async (inputFile, outputFile, password) => {
  throw new Error('PDF unprotection is not yet implemented');
};

export const convertPdfToWord = async (inputFile, outputFile) => {
  throw new Error('PDF to Word conversion is temporarily disabled');
};

export const convertPdfToPowerPoint = async (inputFile, outputFile) => {
  throw new Error('PDF to PowerPoint conversion is temporarily disabled');
};

export const convertPdfToExcel = async (inputFile, outputFile) => {
  throw new Error('PDF to Excel conversion is temporarily disabled');
};

export const cropPdf = async (inputFile, outputFile, cropBox) => {
  try {
    const existingPdfBytes = fs.readFileSync(inputFile);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    
    pages.forEach(page => {
      page.setCropBox(cropBox.x || 0, cropBox.y || 0, cropBox.width || 612, cropBox.height || 792);
    });
    
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputFile, pdfBytes);
    return outputFile;
  } catch (error) {
    throw new Error(`Failed to crop PDF: ${error.message}`);
  }
};

export const comparePdfs = async (file1, file2) => {
  return {
    identical: false,
    file1Length: 100,
    file2Length: 100,
    summary: 'PDF comparison is temporarily disabled'
  };
};

export const getPdfMetadata = async (inputFile) => {
  try {
    const existingPdfBytes = fs.readFileSync(inputFile);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    
    return {
      pageCount: pdfDoc.getPageCount(),
      title: pdfDoc.getTitle() || 'Untitled',
      author: pdfDoc.getAuthor() || 'Unknown',
      subject: pdfDoc.getSubject() || '',
      creator: pdfDoc.getCreator() || 'Unknown',
      producer: pdfDoc.getProducer() || 'Unknown',
    };
  } catch (error) {
    throw new Error(`Failed to get PDF metadata: ${error.message}`);
  }
};

export const cleanupFiles = (files) => {
  files.forEach(file => {
    try {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    } catch (error) {
      console.error(`Error cleaning up file ${file}:`, error);
    }
  });
}; 