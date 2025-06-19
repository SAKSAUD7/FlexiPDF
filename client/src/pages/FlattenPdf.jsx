import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { ArrowLeftIcon, DocumentArrowUpIcon, DocumentTextIcon, XMarkIcon, SquaresPlusIcon } from '@heroicons/react/24/outline';
import { uploadFile } from '../utils/api';
import { downloadBlob } from '../utils/fileUtils';
import toast from 'react-hot-toast';

export default function FlattenPdf() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (selectedFiles) => {
    setFiles(selectedFiles);
  };

  const handleRemoveFile = () => {
    setFiles([]);
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file to flatten');
      return;
    }

    setIsProcessing(true);
    const loadingToast = toast.loading('Flattening PDF...');

    try {
      const response = await uploadFile('/api/pdf/flatten', files[0]);
      downloadBlob(response, files[0].name.replace('.pdf', '_flattened.pdf'));
      toast.success('PDF flattened successfully!', { id: loadingToast });
      setFiles([]);
    } catch (error) {
      console.error('Error flattening PDF:', error);
      toast.error(error.message || 'Failed to flatten PDF. Please try again.', { id: loadingToast });
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
              Flatten PDF
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Remove form fields and make PDF content permanent. Perfect for finalizing forms and preventing further edits.
            </p>
          </div>

          {/* Info Section */}
          <div className="mb-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3">What is PDF Flattening?</h3>
            <p className="text-sm text-blue-800">
              PDF flattening permanently converts form fields, annotations, and interactive elements into static content. 
              This makes the PDF uneditable and ensures the content appears the same on all devices and PDF viewers.
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
              <SquaresPlusIcon className="mx-auto h-12 w-12 text-gray-400" />
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
                        onClick={handleProcess}
                        disabled={isProcessing}
                        className="flex items-center space-x-2 rounded-full bg-primary-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <SquaresPlusIcon className="h-4 w-4" />
                        <span>{isProcessing ? 'Flattening...' : 'Flatten PDF'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* What Gets Flattened */}
            <div className="mt-8 bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-4">What Gets Flattened:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-800">Form Fields</h4>
                  <p className="text-sm text-green-700">Text boxes, checkboxes, radio buttons, dropdowns</p>
                </div>
                <div>
                  <h4 className="font-medium text-green-800">Annotations</h4>
                  <p className="text-sm text-green-700">Comments, highlights, stamps, signatures</p>
                </div>
                <div>
                  <h4 className="font-medium text-green-800">Layers</h4>
                  <p className="text-sm text-green-700">Optional content groups and layer visibility</p>
                </div>
                <div>
                  <h4 className="font-medium text-green-800">Interactive Elements</h4>
                  <p className="text-sm text-green-700">Buttons, links, multimedia objects</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Form Finalization</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Convert fillable forms into permanent, non-editable content.
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Universal Compatibility</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Ensures consistent appearance across all PDF viewers.
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Security Enhancement</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Prevents unauthorized editing of form data and content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 