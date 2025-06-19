import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { ArrowLeftIcon, DocumentArrowUpIcon, CodeBracketIcon, XMarkIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { uploadFile } from '../utils/api';
import { downloadBlob } from '../utils/fileUtils';
import toast from 'react-hot-toast';

export default function HtmlToPdf() {
  const [files, setFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionType, setConversionType] = useState('file'); // 'file' or 'url'
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleFileSelect = (selectedFiles) => {
    setFiles(selectedFiles);
  };

  const handleRemoveFile = () => {
    setFiles([]);
  };

  const handleConvert = async () => {
    if (conversionType === 'file' && files.length === 0) {
      toast.error('Please select an HTML file to convert');
      return;
    }

    if (conversionType === 'url' && !url.trim()) {
      toast.error('Please enter a URL to convert');
      return;
    }

    if (conversionType === 'url' && !isValidUrl(url)) {
      toast.error('Please enter a valid URL (must start with http:// or https://)');
      return;
    }

    setIsConverting(true);
    const loadingToast = toast.loading('Converting to PDF...');

    try {
      let response;
      if (conversionType === 'file') {
        response = await uploadFile('/api/pdf/convert-html-to-pdf', files[0]);
        downloadBlob(response, files[0].name.replace(/\.(html?|htm)$/i, '.pdf'));
      } else {
        // For URL conversion, send URL as form data
        const formData = new FormData();
        formData.append('url', url.trim());
        
        const apiResponse = await fetch('/api/pdf/convert-html-to-pdf', {
          method: 'POST',
          body: formData
        });
        
        if (!apiResponse.ok) {
          throw new Error('Failed to convert URL to PDF');
        }
        
        response = await apiResponse.blob();
        downloadBlob(response, 'webpage.pdf');
      }
      
      toast.success('HTML converted to PDF successfully!', { id: loadingToast });
      setFiles([]);
      setUrl('');
    } catch (error) {
      console.error('Error converting HTML:', error);
      toast.error(error.message || 'Failed to convert HTML. Please try again.', { id: loadingToast });
    } finally {
      setIsConverting(false);
    }
  };

  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      handleFileSelect(acceptedFiles);
    },
    accept: {
      'text/html': ['.html', '.htm']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
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
              HTML to PDF
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Convert HTML files or web pages to PDF format. Perfect for archiving web content or reports.
            </p>
          </div>

          {/* Conversion Type Selection */}
          <div className="mb-8">
            <div className="flex space-x-4">
              <button
                onClick={() => setConversionType('file')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  conversionType === 'file'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                }`}
              >
                <CodeBracketIcon className="h-5 w-5" />
                <span>Upload HTML File</span>
              </button>
              <button
                onClick={() => setConversionType('url')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  conversionType === 'url'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                }`}
              >
                <GlobeAltIcon className="h-5 w-5" />
                <span>Convert from URL</span>
              </button>
            </div>
          </div>

          {/* File Upload Section */}
          {conversionType === 'file' && (
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
                <CodeBracketIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <p className="text-base font-semibold text-gray-900">
                    {isDragActive ? 'Drop your HTML file here' : 'Drag and drop HTML file here'}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    or click to browse files
                  </p>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  HTML files (.html, .htm) up to 10MB
                </p>
              </div>

              {/* Selected File */}
              {files.length > 0 && (
                <div className="mt-6">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <CodeBracketIcon className="h-8 w-8 text-blue-600" />
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
                          onClick={handleConvert}
                          disabled={isConverting}
                          className="rounded-full bg-primary-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          {isConverting ? 'Converting...' : 'Convert to PDF'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* URL Input Section */}
          {conversionType === 'url' && (
            <div className="mt-8">
              <div className="rounded-2xl border-2 border-gray-300 p-8">
                <div className="text-center mb-6">
                  <GlobeAltIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">Enter Website URL</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    We'll convert the webpage to PDF format
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Enter the complete URL including http:// or https://
                    </p>
                  </div>

                  <button
                    onClick={handleConvert}
                    disabled={isConverting || !url.trim()}
                    className="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isConverting ? 'Converting Webpage...' : 'Convert URL to PDF'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-gray-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Dual Input</h3>
              <p className="mt-2 text-sm text-gray-600">
                Convert from HTML files or directly from website URLs.
              </p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Layout Preserved</h3>
              <p className="mt-2 text-sm text-gray-600">
                Maintains original styling, fonts, and formatting in PDF.
              </p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Web Archiving</h3>
              <p className="mt-2 text-sm text-gray-600">
                Perfect for saving web content and creating offline documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 