import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { ArrowLeftIcon, DocumentTextIcon, XMarkIcon, DocumentIcon, CameraIcon } from '@heroicons/react/24/outline';
import { uploadFile } from '../utils/api';
import { downloadBlob } from '../utils/fileUtils';
import toast from 'react-hot-toast';

export default function ScanToPdf() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrEnabled, setOcrEnabled] = useState(true);
  const [enhanceImage, setEnhanceImage] = useState(true);
  const navigate = useNavigate();

  const handleFileSelect = (selectedFiles) => {
    setFiles(selectedFiles);
  };

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      toast.error('Please select image files to convert');
      return;
    }

    setIsProcessing(true);
    const loadingToast = toast.loading('Converting scanned images to PDF...');

    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`images`, file);
      });
      formData.append('ocrEnabled', ocrEnabled.toString());
      formData.append('enhanceImage', enhanceImage.toString());

      const response = await fetch('/api/pdf/scan-to-pdf', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to convert scanned images');
      }

      const blob = await response.blob();
      downloadBlob(blob, 'scanned_document.pdf');
      
      toast.success('Scanned images converted to PDF successfully!', { id: loadingToast });
      setFiles([]);
    } catch (error) {
      console.error('Error converting scanned images:', error);
      toast.error(error.message || 'Failed to convert scanned images. Please try again.', { id: loadingToast });
    } finally {
      setIsProcessing(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      handleFileSelect([...files, ...acceptedFiles]);
    },
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.gif']
    },
    multiple: true,
    maxSize: 10 * 1024 * 1024 // 10MB per file
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back
            </button>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Scan to PDF
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Convert scanned documents and images into searchable PDF files with OCR technology.
            </p>
          </div>

          {/* Upload Area */}
          <div className="mt-8">
            <div
              {...getRootProps()}
              className={`relative rounded-2xl border-2 border-dashed p-12 text-center transition-colors ${
                isDragActive
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-primary-500 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <p className="text-base font-semibold text-gray-900">
                  {isDragActive ? 'Drop your scanned images here' : 'Drag and drop scanned images here'}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  or click to browse files
                </p>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Supports JPG, PNG, TIFF, BMP files up to 10MB each
              </p>
            </div>

            {/* Selected Files */}
            {files.length > 0 && (
              <div className="mt-6 space-y-4">
                {files.map((file, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <CameraIcon className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Processing Options */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Processing Options</h3>
                  
                  <div className="space-y-4">
                    {/* OCR Option */}
                    <div>
                      <div className="flex items-center">
                        <input
                          id="ocr-enabled"
                          type="checkbox"
                          checked={ocrEnabled}
                          onChange={(e) => setOcrEnabled(e.target.checked)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="ocr-enabled" className="ml-2 block text-sm text-gray-900">
                          Enable OCR (Optical Character Recognition)
                        </label>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 ml-6">
                        Make text in images searchable and selectable
                      </p>
                    </div>

                    {/* Image Enhancement */}
                    <div>
                      <div className="flex items-center">
                        <input
                          id="enhance-image"
                          type="checkbox"
                          checked={enhanceImage}
                          onChange={(e) => setEnhanceImage(e.target.checked)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="enhance-image" className="ml-2 block text-sm text-gray-900">
                          Enhance image quality
                        </label>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 ml-6">
                        Automatically improve contrast, brightness, and clarity
                      </p>
                    </div>

                    {/* Process Button */}
                    <button
                      onClick={handleProcess}
                      disabled={isProcessing}
                      className="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isProcessing ? 'Converting to PDF...' : `Convert ${files.length} Image${files.length !== 1 ? 's' : ''} to PDF`}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">OCR Technology</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Extract and make text searchable from scanned documents using AI.
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Multi-Page Support</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Combine multiple scanned pages into a single PDF document.
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Auto Enhancement</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Automatically improve scan quality and remove noise.
                </p>
              </div>
            </div>

            {/* Use Cases */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-4">Perfect For:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-blue-800">📄 Documents</h4>
                  <p className="text-sm text-blue-700">Contracts, invoices, receipts, letters</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">📚 Books & Articles</h4>
                  <p className="text-sm text-blue-700">Research papers, magazines, book pages</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">🏢 Business Forms</h4>
                  <p className="text-sm text-blue-700">Applications, surveys, questionnaires</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">📋 Notes & Handwriting</h4>
                  <p className="text-sm text-blue-700">Meeting notes, handwritten documents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 