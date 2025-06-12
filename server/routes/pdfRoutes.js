import express from 'express';
import { upload, handleMulterError } from '../middleware/upload.js';
import * as pdfUtils from '../utils/pdfUtilsWorking.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to ensure cleanup happens
const handlePdfOperation = async (operation, req, res, outputFileName) => {
  const filesToCleanup = [];
  
  try {
    const result = await operation();
    
    // Send file for download
    res.download(result, outputFileName, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
      }
      // Cleanup all files after download
      pdfUtils.cleanupFiles(filesToCleanup);
    });
    
  } catch (error) {
    console.error('PDF operation error:', error);
    pdfUtils.cleanupFiles(filesToCleanup);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'PDF operation failed' 
    });
  }
  
  // Add uploaded files to cleanup list
  if (req.file) filesToCleanup.push(req.file.path);
  if (req.files) filesToCleanup.push(...req.files.map(f => f.path));
};

// =============================================================================
// CONVERT ROUTES
// =============================================================================

// Convert PDF to Word
router.post('/convert-to-word', upload.single('file'), handleMulterError, async (req, res) => {
  const filesToCleanup = [req.file?.path].filter(Boolean);
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputFile = path.join(__dirname, '../uploads', `converted-${Date.now()}.html`);
    
    await pdfUtils.convertPdfToWord(inputFile, outputFile);
    filesToCleanup.push(outputFile);
    
    res.download(outputFile, 'converted.html', (err) => {
      if (err) console.error('Error downloading file:', err);
      pdfUtils.cleanupFiles(filesToCleanup);
    });
  } catch (error) {
    console.error('Error converting PDF to Word:', error);
    pdfUtils.cleanupFiles(filesToCleanup);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Convert PDF to PowerPoint
router.post('/convert-to-powerpoint', upload.single('file'), handleMulterError, async (req, res) => {
  const filesToCleanup = [req.file?.path].filter(Boolean);
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputFile = path.join(__dirname, '../uploads', `converted-${Date.now()}.txt`);
    
    await pdfUtils.convertPdfToPowerPoint(inputFile, outputFile);
    filesToCleanup.push(outputFile);
    
    res.download(outputFile, 'converted.txt', (err) => {
      if (err) console.error('Error downloading file:', err);
      pdfUtils.cleanupFiles(filesToCleanup);
    });
  } catch (error) {
    console.error('Error converting PDF to PowerPoint:', error);
    pdfUtils.cleanupFiles(filesToCleanup);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Convert PDF to Excel
router.post('/convert-to-excel', upload.single('file'), handleMulterError, async (req, res) => {
  const filesToCleanup = [req.file?.path].filter(Boolean);
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputFile = path.join(__dirname, '../uploads', `converted-${Date.now()}.csv`);
    
    await pdfUtils.convertPdfToExcel(inputFile, outputFile);
    filesToCleanup.push(outputFile);
    
    res.download(outputFile, 'converted.csv', (err) => {
      if (err) console.error('Error downloading file:', err);
      pdfUtils.cleanupFiles(filesToCleanup);
    });
  } catch (error) {
    console.error('Error converting PDF to Excel:', error);
    pdfUtils.cleanupFiles(filesToCleanup);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Convert PDF to JPG
router.post('/convert-to-jpg', upload.single('file'), handleMulterError, async (req, res) => {
  const filesToCleanup = [req.file?.path].filter(Boolean);
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputDir = path.join(__dirname, '../uploads', `images-${Date.now()}`);
    
    const imageFiles = await pdfUtils.convertPdfToJpg(inputFile, outputDir);
    filesToCleanup.push(...imageFiles, outputDir);
    
    if (imageFiles.length === 1) {
      // Single image - send directly
      res.download(imageFiles[0], 'converted.jpg', (err) => {
        if (err) console.error('Error downloading file:', err);
        pdfUtils.cleanupFiles(filesToCleanup);
      });
    } else {
      // Multiple images - send as zip (you'd need to implement zip creation)
      res.json({ 
        success: true, 
        message: `${imageFiles.length} images created`,
        files: imageFiles.map(f => path.basename(f))
      });
      setTimeout(() => pdfUtils.cleanupFiles(filesToCleanup), 5000);
    }
  } catch (error) {
    console.error('Error converting PDF to JPG:', error);
    pdfUtils.cleanupFiles(filesToCleanup);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Convert Word to PDF
router.post('/convert-word-to-pdf', upload.single('file'), handleMulterError, async (req, res) => {
  const filesToCleanup = [req.file?.path].filter(Boolean);
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputFile = path.join(__dirname, '../uploads', `converted-${Date.now()}.pdf`);
    
    await pdfUtils.convertWordToPdf(inputFile, outputFile);
    filesToCleanup.push(outputFile);
    
    res.download(outputFile, 'converted.pdf', (err) => {
      if (err) console.error('Error downloading file:', err);
      pdfUtils.cleanupFiles(filesToCleanup);
    });
  } catch (error) {
    console.error('Error converting Word to PDF:', error);
    pdfUtils.cleanupFiles(filesToCleanup);
    res.status(500).json({ success: false, message: error.message });
  }
});

// =============================================================================
// ORGANIZE ROUTES
// =============================================================================

// Merge PDFs
router.post('/merge', upload.array('files', 10), handleMulterError, async (req, res) => {
  const filesToCleanup = req.files?.map(f => f.path) || [];
  
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({ success: false, message: 'At least 2 files are required for merging' });
    }

    const inputFiles = req.files.map(file => file.path);
    const outputFile = path.join(__dirname, '../uploads', `merged-${Date.now()}.pdf`);
    
    await pdfUtils.mergePdfs(inputFiles, outputFile);
    filesToCleanup.push(outputFile);
    
    res.download(outputFile, 'merged.pdf', (err) => {
      if (err) console.error('Error downloading file:', err);
      pdfUtils.cleanupFiles(filesToCleanup);
    });
  } catch (error) {
    console.error('Error merging PDFs:', error);
    pdfUtils.cleanupFiles(filesToCleanup);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Split PDF
router.post('/split', upload.single('file'), handleMulterError, async (req, res) => {
  const filesToCleanup = [req.file?.path].filter(Boolean);
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputDir = path.join(__dirname, '../uploads', `split-${Date.now()}`);
    
    const splitFiles = await pdfUtils.splitPdf(inputFile, outputDir);
    filesToCleanup.push(...splitFiles, outputDir);
    
    res.json({ 
      success: true, 
      message: `PDF split into ${splitFiles.length} pages`,
      files: splitFiles.map(f => path.basename(f))
    });
    
    // Cleanup after response
    setTimeout(() => pdfUtils.cleanupFiles(filesToCleanup), 5000);
  } catch (error) {
    console.error('Error splitting PDF:', error);
    pdfUtils.cleanupFiles(filesToCleanup);
    res.status(500).json({ success: false, message: error.message });
  }
});

// =============================================================================
// OPTIMIZE ROUTES
// =============================================================================

// Compress PDF
router.post('/compress', upload.single('file'), handleMulterError, async (req, res) => {
  const filesToCleanup = [req.file?.path].filter(Boolean);
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputFile = path.join(__dirname, '../uploads', `compressed-${Date.now()}.pdf`);
    const quality = req.body.quality || 'medium';

    await pdfUtils.compressPdf(inputFile, outputFile, quality);
    filesToCleanup.push(outputFile);
    
    res.download(outputFile, 'compressed.pdf', (err) => {
      if (err) console.error('Error downloading file:', err);
      pdfUtils.cleanupFiles(filesToCleanup);
    });
  } catch (error) {
    console.error('Error compressing PDF:', error);
    pdfUtils.cleanupFiles(filesToCleanup);
    res.status(500).json({ success: false, message: error.message });
  }
});

// =============================================================================
// EDIT ROUTES
// =============================================================================

// Add watermark
router.post('/watermark', upload.single('file'), handleMulterError, async (req, res) => {
  const filesToCleanup = [req.file?.path].filter(Boolean);
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputFile = path.join(__dirname, '../uploads', `watermarked-${Date.now()}.pdf`);
    const watermarkText = req.body.watermarkText || 'CONFIDENTIAL';

    await pdfUtils.addWatermark(inputFile, outputFile, watermarkText);
    filesToCleanup.push(outputFile);
    
    res.download(outputFile, 'watermarked.pdf', (err) => {
      if (err) console.error('Error downloading file:', err);
      pdfUtils.cleanupFiles(filesToCleanup);
    });
  } catch (error) {
    console.error('Error adding watermark:', error);
    pdfUtils.cleanupFiles(filesToCleanup);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Crop PDF
router.post('/crop', upload.single('file'), handleMulterError, async (req, res) => {
  const filesToCleanup = [req.file?.path].filter(Boolean);
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputFile = path.join(__dirname, '../uploads', `cropped-${Date.now()}.pdf`);
    const cropBox = {
      x: parseInt(req.body.x) || 0,
      y: parseInt(req.body.y) || 0,
      width: parseInt(req.body.width) || 612,
      height: parseInt(req.body.height) || 792
    };

    await pdfUtils.cropPdf(inputFile, outputFile, cropBox);
    filesToCleanup.push(outputFile);
    
    res.download(outputFile, 'cropped.pdf', (err) => {
      if (err) console.error('Error downloading file:', err);
      pdfUtils.cleanupFiles(filesToCleanup);
    });
  } catch (error) {
    console.error('Error cropping PDF:', error);
    pdfUtils.cleanupFiles(filesToCleanup);
    res.status(500).json({ success: false, message: error.message });
  }
});

// =============================================================================
// SECURITY ROUTES
// =============================================================================

// Protect PDF with password
router.post('/protect', upload.single('file'), handleMulterError, async (req, res) => {
  const filesToCleanup = [req.file?.path].filter(Boolean);
  
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
    filesToCleanup.push(outputFile);
    
    res.download(outputFile, 'protected.pdf', (err) => {
      if (err) console.error('Error downloading file:', err);
      pdfUtils.cleanupFiles(filesToCleanup);
    });
  } catch (error) {
    console.error('Error protecting PDF:', error);
    pdfUtils.cleanupFiles(filesToCleanup);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Unprotect PDF
router.post('/unprotect', upload.single('file'), handleMulterError, async (req, res) => {
  const filesToCleanup = [req.file?.path].filter(Boolean);
  
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
    filesToCleanup.push(outputFile);
    
    res.download(outputFile, 'unprotected.pdf', (err) => {
      if (err) console.error('Error downloading file:', err);
      pdfUtils.cleanupFiles(filesToCleanup);
    });
  } catch (error) {
    console.error('Error removing PDF protection:', error);
    pdfUtils.cleanupFiles(filesToCleanup);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Sign PDF
router.post('/sign', upload.single('file'), handleMulterError, async (req, res) => {
  const filesToCleanup = [req.file?.path].filter(Boolean);
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const outputFile = path.join(__dirname, '../uploads', `signed-${Date.now()}.pdf`);
    const signature = req.body.signature || 'Digital Signature';

    await pdfUtils.signPdf(inputFile, outputFile, signature);
    filesToCleanup.push(outputFile);
    
    res.download(outputFile, 'signed.pdf', (err) => {
      if (err) console.error('Error downloading file:', err);
      pdfUtils.cleanupFiles(filesToCleanup);
    });
  } catch (error) {
    console.error('Error signing PDF:', error);
    pdfUtils.cleanupFiles(filesToCleanup);
    res.status(500).json({ success: false, message: error.message });
  }
});

// =============================================================================
// TOOLS ROUTES
// =============================================================================

// Extract text (OCR)
router.post('/extract-text', upload.single('file'), handleMulterError, async (req, res) => {
  const filesToCleanup = [req.file?.path].filter(Boolean);
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const extractedText = await pdfUtils.extractTextFromPdf(inputFile);
    
    pdfUtils.cleanupFiles(filesToCleanup);
    
    res.json({ 
      success: true, 
      text: extractedText,
      length: extractedText.length
    });
  } catch (error) {
    console.error('Error extracting text:', error);
    pdfUtils.cleanupFiles(filesToCleanup);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Compare PDFs
router.post('/compare', upload.array('files', 2), handleMulterError, async (req, res) => {
  const filesToCleanup = req.files?.map(f => f.path) || [];
  
  try {
    if (!req.files || req.files.length !== 2) {
      return res.status(400).json({ success: false, message: 'Exactly 2 files are required for comparison' });
    }

    const [file1, file2] = req.files.map(file => file.path);
    const comparison = await pdfUtils.comparePdfs(file1, file2);
    
    pdfUtils.cleanupFiles(filesToCleanup);
    
    res.json({ 
      success: true, 
      comparison 
    });
  } catch (error) {
    console.error('Error comparing PDFs:', error);
    pdfUtils.cleanupFiles(filesToCleanup);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get PDF metadata
router.post('/metadata', upload.single('file'), handleMulterError, async (req, res) => {
  const filesToCleanup = [req.file?.path].filter(Boolean);
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const inputFile = req.file.path;
    const metadata = await pdfUtils.getPdfMetadata(inputFile);
    
    pdfUtils.cleanupFiles(filesToCleanup);
    
    res.json({ 
      success: true, 
      metadata 
    });
  } catch (error) {
    console.error('Error getting PDF metadata:', error);
    pdfUtils.cleanupFiles(filesToCleanup);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'PDF service is running',
    timestamp: new Date().toISOString()
  });
});

export default router; 
