import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, DocumentArrowUpIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from '../utils/api';
import toast from 'react-hot-toast';

export default function OcrPdf() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const navigate = useNavigate();

  const handleFileSelect = (selectedFiles) => {
    setFiles(selectedFiles);
    setExtractedText('');
  };

  const handleRemoveFile = () => {
    setFiles([]);
    setExtractedText('');
  };

  const handleExtractText = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file');
      return;
    }

    setIsProcessing(true);
    const loadingToast = toast.loading('Extracting text from your PDF...');

    try {
      const response = await fetch('/api/pdf/extract-text', {
        method: 'POST',
        body: (() => {
          const formData = new FormData();
          formData.append('file', files[0]);
          return formData;
        })()
      });

      if (!response.ok) {
        throw new Error('Failed to extract text');
      }

      const data = await response.json();
      setExtractedText(data.text);
      toast.success('Text extracted successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Error extracting text:', error);
      toast.error(error.message || 'Failed to extract text. Please try again.', { id: loadingToast });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${files[0].name.replace('.pdf', '')}_extracted_text.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      handleFileSelect(acceptedFiles);
    },
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-4xl">
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
              OCR PDF - Extract Text
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Extract text from scanned PDFs and image-based documents using OCR technology.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div>
              <div
                {...getRootProps()}
                className={`relative rounded-2xl border-2 border-dashed p-12 text-center transition-colors ${
                  isDragActive
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-500 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <p className="text-base font-semibold text-gray-900">
                    {isDragActive ? 'Drop your PDF here' : 'Drag and drop your PDF here'}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    or click to browse files
                  </p>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  PDF files up to 10MB
                </p>
              </div>

              {/* Selected File */}
              {files.length > 0 && (
                <div className="mt-6">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <MagnifyingGlassIcon className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{files[0].name}</p>
                          <p className="text-sm text-gray-500">
                            {(files[0].size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={handleRemoveFile}
                          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={handleExtractText}
                          disabled={isProcessing}
                          className="rounded-full bg-primary-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          {isProcessing ? 'Extracting...' : 'Extract Text'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Text Output Section */}
            <div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 h-80">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Extracted Text</h3>
                  {extractedText && (
                    <button
                      onClick={downloadText}
                      className="rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
                    >
                      Download Text
                    </button>
                  )}
                </div>
                <div className="h-60 overflow-y-auto">
                  {extractedText ? (
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                      {extractedText}
                    </pre>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-gray-500 text-center">
                        Upload a PDF and click "Extract Text" to see the results here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-gray-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900">OCR Technology</h3>
              <p className="mt-2 text-sm text-gray-600">
                Advanced optical character recognition to extract text from images and scanned documents.
              </p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Multiple Languages</h3>
              <p className="mt-2 text-sm text-gray-600">
                Supports text extraction in multiple languages and character sets.
              </p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Searchable Text</h3>
              <p className="mt-2 text-sm text-gray-600">
                Convert scanned documents into searchable and editable text format.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 