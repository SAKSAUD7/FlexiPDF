import CloudmersiveConvertApiClient from 'cloudmersive-convert-api-client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure API key authorization
const defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;
const Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = process.env.CLOUDMERSIVE_API_KEY;

// Create API instances
const convertDocumentApi = new CloudmersiveConvertApiClient.ConvertDocumentApi();
const editDocumentApi = new CloudmersiveConvertApiClient.EditDocumentApi();
const mergeDocumentApi = new CloudmersiveConvertApiClient.MergeDocumentApi();

/**
 * Convert PDF to Word document
 * @param {string} inputFile - Path to input PDF file
 * @param {string} outputFile - Path to save output Word file
 */
export const convertPdfToWord = async (inputFile, outputFile) => {
  try {
    const inputFileBuffer = fs.readFileSync(inputFile);
    const result = await convertDocumentApi.convertDocumentPdfToDocx(inputFileBuffer);
    fs.writeFileSync(outputFile, result);
    return outputFile;
  } catch (error) {
    console.error('Error converting PDF to Word:', error);
    throw error;
  }
};

/**
 * Convert PDF to PowerPoint
 * @param {string} inputFile - Path to input PDF file
 * @param {string} outputFile - Path to save output PowerPoint file
 */
export const convertPdfToPowerPoint = async (inputFile, outputFile) => {
  try {
    const inputFileBuffer = fs.readFileSync(inputFile);
    const result = await convertDocumentApi.convertDocumentPdfToPptx(inputFileBuffer);
    fs.writeFileSync(outputFile, result);
    return outputFile;
  } catch (error) {
    console.error('Error converting PDF to PowerPoint:', error);
    throw error;
  }
};

/**
 * Convert PDF to Excel
 * @param {string} inputFile - Path to input PDF file
 * @param {string} outputFile - Path to save output Excel file
 */
export const convertPdfToExcel = async (inputFile, outputFile) => {
  try {
    const inputFileBuffer = fs.readFileSync(inputFile);
    const result = await convertDocumentApi.convertDocumentPdfToXlsx(inputFileBuffer);
    fs.writeFileSync(outputFile, result);
    return outputFile;
  } catch (error) {
    console.error('Error converting PDF to Excel:', error);
    throw error;
  }
};

/**
 * Merge multiple PDF files
 * @param {string[]} inputFiles - Array of paths to input PDF files
 * @param {string} outputFile - Path to save merged PDF file
 */
export const mergePdfs = async (inputFiles, outputFile) => {
  try {
    const inputFileBuffers = inputFiles.map(file => fs.readFileSync(file));
    const result = await mergeDocumentApi.mergeDocumentPdfMulti(inputFileBuffers);
    fs.writeFileSync(outputFile, result);
    return outputFile;
  } catch (error) {
    console.error('Error merging PDFs:', error);
    throw error;
  }
};

/**
 * Compress PDF file
 * @param {string} inputFile - Path to input PDF file
 * @param {string} outputFile - Path to save compressed PDF file
 * @param {number} quality - Compression quality (1-100)
 */
export const compressPdf = async (inputFile, outputFile, quality = 80) => {
  try {
    const inputFileBuffer = fs.readFileSync(inputFile);
    const result = await editDocumentApi.compressPdf(inputFileBuffer, { quality });
    fs.writeFileSync(outputFile, result);
    return outputFile;
  } catch (error) {
    console.error('Error compressing PDF:', error);
    throw error;
  }
};

/**
 * Add watermark to PDF
 * @param {string} inputFile - Path to input PDF file
 * @param {string} outputFile - Path to save watermarked PDF file
 * @param {string} watermarkText - Text to use as watermark
 */
export const addWatermark = async (inputFile, outputFile, watermarkText) => {
  try {
    const inputFileBuffer = fs.readFileSync(inputFile);
    const result = await editDocumentApi.editPdfAddWatermarkText(
      inputFileBuffer,
      { watermarkText }
    );
    fs.writeFileSync(outputFile, result);
    return outputFile;
  } catch (error) {
    console.error('Error adding watermark:', error);
    throw error;
  }
};

/**
 * Protect PDF with password
 * @param {string} inputFile - Path to input PDF file
 * @param {string} outputFile - Path to save protected PDF file
 * @param {string} password - Password to protect PDF with
 */
export const protectPdf = async (inputFile, outputFile, password) => {
  try {
    const inputFileBuffer = fs.readFileSync(inputFile);
    const result = await editDocumentApi.editPdfEncrypt(
      inputFileBuffer,
      { password }
    );
    fs.writeFileSync(outputFile, result);
    return outputFile;
  } catch (error) {
    console.error('Error protecting PDF:', error);
    throw error;
  }
};

/**
 * Remove password protection from PDF
 * @param {string} inputFile - Path to input PDF file
 * @param {string} outputFile - Path to save unprotected PDF file
 * @param {string} password - Current PDF password
 */
export const unprotectPdf = async (inputFile, outputFile, password) => {
  try {
    const inputFileBuffer = fs.readFileSync(inputFile);
    const result = await editDocumentApi.editPdfDecrypt(
      inputFileBuffer,
      { password }
    );
    fs.writeFileSync(outputFile, result);
    return outputFile;
  } catch (error) {
    console.error('Error removing PDF protection:', error);
    throw error;
  }
};

/**
 * Convert PDF to images
 * @param {string} inputFile - Path to input PDF file
 * @param {string} outputDir - Directory to save output images
 * @param {string} format - Output image format (jpg, png)
 */
export const convertPdfToImages = async (inputFile, outputDir, format = 'jpg') => {
  try {
    const inputFileBuffer = fs.readFileSync(inputFile);
    const result = await convertDocumentApi.convertDocumentPdfToJpg(inputFileBuffer);
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save each page as an image
    const imageFiles = [];
    for (let i = 0; i < result.length; i++) {
      const outputFile = path.join(outputDir, `page-${i + 1}.${format}`);
      fs.writeFileSync(outputFile, result[i]);
      imageFiles.push(outputFile);
    }

    return imageFiles;
  } catch (error) {
    console.error('Error converting PDF to images:', error);
    throw error;
  }
};

/**
 * Perform OCR on PDF
 * @param {string} inputFile - Path to input PDF file
 * @param {string} outputFile - Path to save OCR'd PDF file
 */
export const performOcr = async (inputFile, outputFile) => {
  try {
    const inputFileBuffer = fs.readFileSync(inputFile);
    const result = await convertDocumentApi.convertDocumentPdfToPdfOcr(inputFileBuffer);
    fs.writeFileSync(outputFile, result);
    return outputFile;
  } catch (error) {
    console.error('Error performing OCR:', error);
    throw error;
  }
};

/**
 * Clean up temporary files
 * @param {string[]} files - Array of file paths to delete
 */
export const cleanupFiles = (files) => {
  files.forEach(file => {
    try {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    } catch (error) {
      console.error(`Error deleting file ${file}:`, error);
    }
  });
}; 