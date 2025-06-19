import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { ArrowLeftIcon, DocumentArrowUpIcon, WrenchScrewdriverIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { uploadFile } from '../utils/api';
import { downloadBlob } from '../utils/fileUtils';
import toast from 'react-hot-toast';

export default function RepairPdf() {
  const [files, setFiles] = useState([]);
  const [isRepairing, setIsRepairing] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (selectedFiles) => {
    setFiles(selectedFiles);
  };

  const handleRemoveFile = () => {
    setFiles([]);
  };

  const handleRepair = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file to repair');
      return;
    }

    setIsRepairing(true);
    const loadingToast = toast.loading('Analyzing and repairing PDF...');

    try {
      const response = await uploadFile('/api/pdf/repair', files[0]);
      downloadBlob(response, files[0].name.replace('.pdf', '_repaired.pdf'));
      toast.success('PDF repaired successfully!', { id: loadingToast });
      setFiles([]);
    } catch (error) {
      console.error('Error repairing PDF:', error);
      toast.error(error.message || 'Failed to repair PDF. The file may be severely corrupted.', { id: loadingToast });
    } finally {
      setIsRepairing(false);
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
    maxSize: 50 * 1024 * 1024 // 50MB for potentially corrupted files
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
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center mb-4">
                <WrenchScrewdriverIcon className="h-8 w-8 text-blue-600 mr-2" />
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  PDF Repair Tool
                </h1>
              </div>
              <p className="text-lg text-gray-600">
                Fix corrupted, damaged, or unreadable PDF files. Recover your important documents with advanced repair algorithms.
              </p>
            </div>
          </div>

          {/* Upload Area */}
          <div className="mt-8">
            <div
              {...getRootProps()}
              className={`relative rounded-2xl border-2 border-dashed p-12 text-center transition-colors ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-500 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <WrenchScrewdriverIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <p className="text-base font-semibold text-gray-900">
                  {isDragActive ? 'Drop your corrupted PDF here' : 'Drag and drop corrupted PDF here'}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  or click to browse files
                </p>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                PDF files up to 50MB (larger files accepted for repair)
              </p>
            </div>

            {/* Selected File */}
            {files.length > 0 && (
              <div className="mt-6">
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <WrenchScrewdriverIcon className="h-8 w-8 text-blue-600" />
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
                        onClick={handleRepair}
                        disabled={isRepairing}
                        className="flex items-center space-x-2 rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <WrenchScrewdriverIcon className="h-4 w-4" />
                        <span>{isRepairing ? 'Repairing...' : 'Repair PDF'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Common Issues */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Common PDF Issues We Fix:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Corrupted File Structure</p>
                    <p className="text-sm text-blue-700">Fix internal PDF structure damage</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Missing Fonts</p>
                    <p className="text-sm text-blue-700">Resolve font-related display issues</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Broken Images</p>
                    <p className="text-sm text-blue-700">Repair corrupted embedded images</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Metadata Errors</p>
                    <p className="text-sm text-blue-700">Fix document property issues</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Advanced Recovery</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Uses sophisticated algorithms to recover maximum content from damaged files.
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Safe Process</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Non-destructive repair process that preserves your original file.
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Multiple Issues</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Fixes various corruption types including structure, fonts, and images.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 