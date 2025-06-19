import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { ArrowLeftIcon, DocumentArrowUpIcon, DocumentTextIcon, XMarkIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { uploadFile } from '../utils/api';
import { downloadBlob } from '../utils/fileUtils';
import toast from 'react-hot-toast';

export default function PdfToPdfA() {
  const [files, setFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (selectedFiles) => {
    setFiles(selectedFiles);
  };

  const handleRemoveFile = () => {
    setFiles([]);
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file to convert');
      return;
    }

    setIsConverting(true);
    const loadingToast = toast.loading('Converting to PDF/A format...');

    try {
      const response = await uploadFile('/api/pdf/convert-to-pdf-a', files[0]);
      downloadBlob(response, files[0].name.replace('.pdf', '_PDF-A.pdf'));
      toast.success('PDF converted to PDF/A successfully!', { id: loadingToast });
      setFiles([]);
    } catch (error) {
      console.error('Error converting to PDF/A:', error);
      toast.error(error.message || 'Failed to convert to PDF/A. Please try again.', { id: loadingToast });
    } finally {
      setIsConverting(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      handleFileSelect(acceptedFiles);
    },
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024 // 50MB
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
              PDF to PDF/A
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Convert your PDF to PDF/A format for long-term archival and compliance with ISO standards.
            </p>
          </div>

          {/* Info Section */}
          <div className="mb-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-start space-x-3">
              <ArchiveBoxIcon className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900">What is PDF/A?</h3>
                <p className="text-sm text-blue-800 mt-1">
                  PDF/A is an ISO-standardized version of PDF specialized for digital preservation. 
                  It ensures documents remain accessible and readable for decades, making it perfect for legal, 
                  governmental, and archival purposes.
                </p>
              </div>
            </div>
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
              <ArchiveBoxIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <p className="text-base font-semibold text-gray-900">
                  {isDragActive ? 'Drop your PDF here' : 'Drag and drop PDF here'}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  or click to browse files
                </p>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                PDF files up to 50MB
              </p>
            </div>

            {/* Selected File */}
            {files.length > 0 && (
              <div className="mt-6">
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <DocumentTextIcon className="h-8 w-8 text-blue-600" />
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
                        className="flex items-center space-x-2 rounded-full bg-primary-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <ArchiveBoxIcon className="h-4 w-4" />
                        <span>{isConverting ? 'Converting...' : 'Convert to PDF/A'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Benefits Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-3">✅ PDF/A Benefits</h3>
                <ul className="text-sm text-green-800 space-y-2">
                  <li>• Long-term preservation guarantee</li>
                  <li>• Self-contained (all fonts embedded)</li>
                  <li>• Compliance with ISO 19005 standard</li>
                  <li>• Legal and regulatory compliance</li>
                  <li>• Device-independent viewing</li>
                </ul>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-3">📋 Perfect For</h3>
                <ul className="text-sm text-yellow-800 space-y-2">
                  <li>• Legal documents and contracts</li>
                  <li>• Government records</li>
                  <li>• Academic papers and research</li>
                  <li>• Corporate archives</li>
                  <li>• Historical documentation</li>
                </ul>
              </div>
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">ISO Compliance</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Meets ISO 19005 standards for long-term digital preservation.
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Self-Contained</h3>
                <p className="mt-2 text-sm text-gray-600">
                  All fonts and resources embedded for consistent viewing.
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Future-Proof</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Designed to remain accessible and viewable for decades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 