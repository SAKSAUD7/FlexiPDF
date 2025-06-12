import express from 'express';
import { upload, handleMulterError } from '../middleware/upload.js';
import * as pdfUtils from '../utils/pdfUtils.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Convert PDF to Word
router.post('/convert-to-word', upload.single('file'), handleMulterError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputFile = path.join(__dirname, '../uploads', `converted-${Date.now()}.docx`);

    await pdfUtils.convertPdfToWord(inputFile, outputFile);
    
    res.download(outputFile, 'converted.docx', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
      }
      // Cleanup files after download
      pdfUtils.cleanupFiles([inputFile, outputFile]);
    });
  } catch (error) {
    console.error('Error converting PDF to Word:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Convert PDF to PowerPoint
router.post('/convert-to-powerpoint', upload.single('file'), handleMulterError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputFile = path.join(__dirname, '../uploads', `converted-${Date.now()}.pptx`);

    await pdfUtils.convertPdfToPowerPoint(inputFile, outputFile);
    
    res.download(outputFile, 'converted.pptx', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
      }
      pdfUtils.cleanupFiles([inputFile, outputFile]);
    });
  } catch (error) {
    console.error('Error converting PDF to PowerPoint:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Convert PDF to Excel
router.post('/convert-to-excel', upload.single('file'), handleMulterError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputFile = path.join(__dirname, '../uploads', `converted-${Date.now()}.xlsx`);

    await pdfUtils.convertPdfToExcel(inputFile, outputFile);
    
    res.download(outputFile, 'converted.xlsx', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
      }
      pdfUtils.cleanupFiles([inputFile, outputFile]);
    });
  } catch (error) {
    console.error('Error converting PDF to Excel:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Merge PDFs
router.post('/merge', upload.array('files', 10), handleMulterError, async (req, res) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({ success: false, message: 'At least 2 files are required for merging' });
    }

    const inputFiles = req.files.map(file => file.path);
    const outputFile = path.join(__dirname, '../uploads', `merged-${Date.now()}.pdf`);

    await pdfUtils.mergePdfs(inputFiles, outputFile);
    
    res.download(outputFile, 'merged.pdf', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
      }
      pdfUtils.cleanupFiles([...inputFiles, outputFile]);
    });
  } catch (error) {
    console.error('Error merging PDFs:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Compress PDF
router.post('/compress', upload.single('file'), handleMulterError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputFile = path.join(__dirname, '../uploads', `compressed-${Date.now()}.pdf`);
    const quality = req.body.quality || 'medium';

    await pdfUtils.compressPdf(inputFile, outputFile, quality);
    
    res.download(outputFile, 'compressed.pdf', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
      }
      pdfUtils.cleanupFiles([inputFile, outputFile]);
    });
  } catch (error) {
    console.error('Error compressing PDF:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add watermark
router.post('/watermark', upload.single('file'), handleMulterError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputFile = path.join(__dirname, '../uploads', `watermarked-${Date.now()}.pdf`);
    const watermarkText = req.body.watermarkText || 'CONFIDENTIAL';

    await pdfUtils.addWatermark(inputFile, outputFile, watermarkText);
    
    res.download(outputFile, 'watermarked.pdf', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
      }
      pdfUtils.cleanupFiles([inputFile, outputFile]);
    });
  } catch (error) {
    console.error('Error adding watermark:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Protect PDF with password
router.post('/protect', upload.single('file'), handleMulterError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputFile = path.join(__dirname, '../uploads', `protected-${Date.now()}.pdf`);
    const password = req.body.password;

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }

    await pdfUtils.protectPdf(inputFile, outputFile, password);
    
    res.download(outputFile, 'protected.pdf', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
      }
      pdfUtils.cleanupFiles([inputFile, outputFile]);
    });
  } catch (error) {
    console.error('Error protecting PDF:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Unprotect PDF
router.post('/unprotect', upload.single('file'), handleMulterError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputFile = path.join(__dirname, '../uploads', `unprotected-${Date.now()}.pdf`);
    const password = req.body.password;

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }

    await pdfUtils.unprotectPdf(inputFile, outputFile, password);
    
    res.download(outputFile, 'unprotected.pdf', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
      }
      pdfUtils.cleanupFiles([inputFile, outputFile]);
    });
  } catch (error) {
    console.error('Error unprotecting PDF:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Convert PDF to images
router.post('/to-images', upload.single('file'), handleMulterError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputDir = path.join(__dirname, '../uploads', `images-${Date.now()}`);
    const format = req.body.format || 'png';

    const imageFiles = await pdfUtils.convertPdfToImages(inputFile, outputDir, format);
    
    // Create a zip file containing all images
    const zipFile = path.join(__dirname, '../uploads', `images-${Date.now()}.zip`);
    // TODO: Implement zip creation logic
    
    res.download(zipFile, 'images.zip', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
      }
      pdfUtils.cleanupFiles([inputFile, ...imageFiles, zipFile]);
    });
  } catch (error) {
    console.error('Error converting PDF to images:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Perform OCR on PDF
router.post('/ocr', upload.single('file'), handleMulterError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputFile = path.join(__dirname, '../uploads', `ocr-${Date.now()}.pdf`);

    await pdfUtils.performOcr(inputFile, outputFile);
    
    res.download(outputFile, 'ocr.pdf', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
      }
      pdfUtils.cleanupFiles([inputFile, outputFile]);
    });
  } catch (error) {
    console.error('Error performing OCR:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router; 