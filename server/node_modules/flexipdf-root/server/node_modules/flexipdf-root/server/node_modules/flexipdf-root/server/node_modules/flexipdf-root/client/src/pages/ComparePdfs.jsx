import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, DocumentDuplicateIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';
import { uploadMultipleFiles } from '../utils/api';
import toast from 'react-hot-toast';

export default function ComparePdfs() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [comparisonResult, setComparisonResult] = useState(null);
  const navigate = useNavigate();

  const handleFileSelect = (selectedFiles) => {
    if (selectedFiles.length > 2) {
      toast.error('Please select only 2 PDF files for comparison');
      return;
    }
    setFiles(selectedFiles);
    setComparisonResult(null);
  };

  const handleRemoveFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setComparisonResult(null);
  };

  const handleCompare = async () => {
    if (files.length !== 2) {
      toast.error('Please select exactly 2 PDF files to compare');
      return;
    }

    setIsProcessing(true);
    const loadingToast = toast.loading('Comparing your PDF files...');

    try {
      const response = await fetch('/api/pdf/compare', {
        method: 'POST',
        body: (() => {
          const formData = new FormData();
          files.forEach((file) => {
            formData.append('files', file);
          });
          return formData;
        })()
      });

      if (!response.ok) {
        throw new Error('Failed to compare PDFs');
      }

      const data = await response.json();
      setComparisonResult(data.comparison);
      toast.success('PDFs compared successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Error comparing PDFs:', error);
      toast.error(error.message || 'Failed to compare PDFs. Please try again.', { id: loadingToast });
    } finally {
      setIsProcessing(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      handleFileSelect(acceptedFiles);
    },
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 2,
    maxSize: 10 * 1024 * 1024 // 10MB per file
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
              Compare PDF Documents
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Compare two PDF documents to find differences in content and structure.
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
                <DocumentDuplicateIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <p className="text-base font-semibold text-gray-900">
                    {isDragActive ? 'Drop your PDFs here' : 'Drop 2 PDF files here to compare'}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    or click to browse files
                  </p>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Select exactly 2 PDF files (max 10MB each)
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
                            <DocumentDuplicateIcon className="h-8 w-8 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              PDF {index + 1}: {file.name}
                            </p>
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

                  {files.length === 2 && (
                    <button
                      onClick={handleCompare}
                      disabled={isProcessing}
                      className="w-full rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isProcessing ? 'Comparing PDFs...' : 'Compare PDFs'}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Comparison Results */}
            <div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 h-80">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparison Results</h3>
                <div className="h-60 overflow-y-auto">
                  {comparisonResult ? (
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-medium text-gray-900 mb-2">Status</h4>
                        <p className={`text-sm ${comparisonResult.identical ? 'text-green-600' : 'text-yellow-600'}`}>
                          {comparisonResult.identical ? '✓ Files are identical' : '⚠ Files have differences'}
                        </p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-medium text-gray-900 mb-2">File Sizes</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>PDF 1: {comparisonResult.file1Length} characters</p>
                          <p>PDF 2: {comparisonResult.file2Length} characters</p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                        <p className="text-sm text-gray-600">
                          {comparisonResult.summary}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-gray-500 text-center">
                        Upload 2 PDF files and click "Compare PDFs" to see the results here.
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
              <h3 className="text-lg font-semibold text-gray-900">Text Comparison</h3>
              <p className="mt-2 text-sm text-gray-600">
                Compare the textual content of two PDF documents to identify differences.
              </p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Quick Analysis</h3>
              <p className="mt-2 text-sm text-gray-600">
                Get instant results showing whether documents are identical or different.
              </p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Version Control</h3>
              <p className="mt-2 text-sm text-gray-600">
                Perfect for comparing different versions of contracts and documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 