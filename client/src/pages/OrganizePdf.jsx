import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { ArrowLeftIcon, DocumentArrowUpIcon, DocumentTextIcon, XMarkIcon, ArrowsUpDownIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { uploadFile } from '../utils/api';
import { downloadBlob } from '../utils/fileUtils';
import toast from 'react-hot-toast';

export default function OrganizePdf() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageOrder, setPageOrder] = useState('');
  const [pageOrderError, setPageOrderError] = useState('');
  const navigate = useNavigate();

  const handleFileSelect = (selectedFiles) => {
    setFiles(selectedFiles);
  };

  const handleRemoveFile = () => {
    setFiles([]);
    setPageOrder('');
    setPageOrderError('');
  };

  const validatePageOrder = (orderString) => {
    if (!orderString.trim()) {
      setPageOrderError('Please specify the new page order');
      return false;
    }

    // Check for valid format: numbers and commas only
    const validFormat = /^[\d,\s]+$/.test(orderString.trim());
    if (!validFormat) {
      setPageOrderError('Use format: 1,3,2,4 (numbers and commas only)');
      return false;
    }

    setPageOrderError('');
    return true;
  };

  const handlePageOrderChange = (value) => {
    setPageOrder(value);
    if (value.trim()) {
      validatePageOrder(value);
    } else {
      setPageOrderError('');
    }
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file');
      return;
    }

    if (!validatePageOrder(pageOrder)) {
      return;
    }

    setIsProcessing(true);
    const loadingToast = toast.loading('Reorganizing PDF pages...');

    try {
      const response = await uploadFile('/api/pdf/organize', files[0], {
        pageOrder: pageOrder.trim()
      });
      
      downloadBlob(response, files[0].name.replace('.pdf', '_organized.pdf'));
      toast.success('PDF pages reorganized successfully!', { id: loadingToast });
      setFiles([]);
      setPageOrder('');
    } catch (error) {
      console.error('Error organizing PDF:', error);
      toast.error(error.message || 'Failed to organize PDF. Please try again.', { id: loadingToast });
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
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const quickOrderTemplates = [
    { name: 'Reverse Order', description: 'Last page first', example: 'For 4 pages: 4,3,2,1' },
    { name: 'Even First', description: 'Even pages before odd', example: 'For 4 pages: 2,4,1,3' },
    { name: 'Odd First', description: 'Odd pages before even', example: 'For 4 pages: 1,3,2,4' }
  ];

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
              Organize PDF
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Rearrange and reorder pages in your PDF document. Perfect for fixing page sequences or creating custom layouts.
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
              <ArrowsUpDownIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <p className="text-base font-semibold text-gray-900">
                  {isDragActive ? 'Drop your PDF here' : 'Drag and drop PDF here'}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  or click to browse files
                </p>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                PDF files up to 10MB
              </p>
            </div>

            {/* Selected File and Options */}
            {files.length > 0 && (
              <div className="mt-6 space-y-6">
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
                    <button
                      onClick={handleRemoveFile}
                      className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Page Order Configuration */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <ArrowsUpDownIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Configure Page Order</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Page Order
                      </label>
                      <input
                        type="text"
                        value={pageOrder}
                        onChange={(e) => handlePageOrderChange(e.target.value)}
                        placeholder="e.g., 1,3,2,5,4"
                        className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                          pageOrderError ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {pageOrderError && (
                        <p className="mt-1 text-sm text-red-600">{pageOrderError}</p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">
                        Specify the desired order of pages using page numbers separated by commas.
                      </p>
                    </div>

                    {/* Quick Templates */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Templates:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {quickOrderTemplates.map((template, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="text-sm font-medium text-gray-900">{template.name}</h5>
                              <ChevronUpIcon className="h-4 w-4 text-gray-400" />
                            </div>
                            <p className="text-xs text-gray-600">{template.description}</p>
                            <p className="text-xs text-gray-500 mt-1">{template.example}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">Examples:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• <code>1,3,2,4</code> - Move page 3 to position 2</li>
                        <li>• <code>4,3,2,1</code> - Reverse the entire document</li>
                        <li>• <code>2,1,3,4,5</code> - Swap first two pages</li>
                        <li>• <code>1,1,2,3</code> - Duplicate page 1 at the beginning</li>
                      </ul>
                    </div>

                    <button
                      onClick={handleProcess}
                      disabled={isProcessing || !pageOrder.trim() || !!pageOrderError}
                      className="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isProcessing ? 'Organizing Pages...' : 'Organize PDF'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Flexible Reordering</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Rearrange pages in any order using simple number sequences.
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Duplicate Pages</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Duplicate specific pages by repeating page numbers.
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Quick Templates</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Use predefined templates for common reorganization patterns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 