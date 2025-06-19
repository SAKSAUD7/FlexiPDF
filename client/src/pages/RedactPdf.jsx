import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { ArrowLeftIcon, DocumentArrowUpIcon, DocumentTextIcon, XMarkIcon, EyeSlashIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { uploadFile } from '../utils/api';
import { downloadBlob } from '../utils/fileUtils';
import toast from 'react-hot-toast';

export default function RedactPdf() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [redactionAreas, setRedactionAreas] = useState([]);
  const navigate = useNavigate();

  const handleFileSelect = (selectedFiles) => {
    setFiles(selectedFiles);
  };

  const handleRemoveFile = () => {
    setFiles([]);
    setRedactionAreas([]);
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file to redact');
      return;
    }

    setIsProcessing(true);
    const loadingToast = toast.loading('Redacting sensitive information...');

    try {
      const response = await uploadFile('/api/pdf/redact', files[0], {
        redactionAreas: JSON.stringify(redactionAreas)
      });
      
      downloadBlob(response, files[0].name.replace('.pdf', '_redacted.pdf'));
      toast.success('PDF redacted successfully! Sensitive information removed.', { id: loadingToast });
      setFiles([]);
      setRedactionAreas([]);
    } catch (error) {
      console.error('Error redacting PDF:', error);
      toast.error(error.message || 'Failed to redact PDF. Please try again.', { id: loadingToast });
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

  const securityFeatures = [
    { title: 'Text Redaction', description: 'Permanently remove sensitive text and data', icon: '📝' },
    { title: 'Image Redaction', description: 'Black out sensitive images and graphics', icon: '🖼️' },
    { title: 'Permanent Removal', description: 'Information is completely deleted, not just hidden', icon: '🔒' },
    { title: 'Compliance Ready', description: 'Meets legal and regulatory redaction standards', icon: '⚖️' }
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
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center mb-4">
                <EyeSlashIcon className="h-8 w-8 text-red-600 mr-2" />
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Redact PDF
                </h1>
              </div>
              <p className="text-lg text-gray-600">
                Permanently remove sensitive information from your PDF documents. Perfect for legal, medical, and confidential documents.
              </p>
            </div>
          </div>

          {/* Security Warning */}
          <div className="mb-8 bg-amber-50 rounded-lg p-6 border border-amber-200">
            <div className="flex items-start space-x-3">
              <ShieldExclamationIcon className="h-6 w-6 text-amber-600 mt-1" />
              <div>
                <h3 className="font-semibold text-amber-900">Security Notice</h3>
                <p className="text-sm text-amber-800 mt-1">
                  Redaction permanently removes information from your PDF. This process cannot be undone. 
                  Always keep a backup of your original document before redacting.
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
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-red-500 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <EyeSlashIcon className="mx-auto h-12 w-12 text-gray-400" />
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

            {/* Selected File */}
            {files.length > 0 && (
              <div className="mt-6">
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <DocumentTextIcon className="h-8 w-8 text-red-600" />
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
                        className="flex items-center space-x-2 rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <EyeSlashIcon className="h-4 w-4" />
                        <span>{isProcessing ? 'Redacting...' : 'Redact PDF'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Redaction Info */}
                <div className="mt-4 bg-red-50 rounded-lg p-4 border border-red-200">
                  <h3 className="font-semibold text-red-900 mb-2">Automatic Redaction Features:</h3>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>✓ Social Security Numbers (XXX-XX-XXXX)</li>
                    <li>✓ Credit Card Numbers (XXXX-XXXX-XXXX-XXXX)</li>
                    <li>✓ Phone Numbers ((XXX) XXX-XXXX)</li>
                    <li>✓ Email Addresses (user@domain.com)</li>
                    <li>✓ Common sensitive patterns and keywords</li>
                  </ul>
                  <p className="text-xs text-red-700 mt-2">
                    Our AI automatically detects and redacts common sensitive information patterns.
                  </p>
                </div>
              </div>
            )}

            {/* Security Features Grid */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="rounded-2xl bg-gray-50 p-6 border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                      <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Use Cases */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-4">Common Use Cases:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-blue-800">Legal Documents</h4>
                  <p className="text-sm text-blue-700">Remove client names, case numbers, and sensitive legal information</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">Medical Records</h4>
                  <p className="text-sm text-blue-700">Redact patient information, SSNs, and medical IDs</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">Financial Reports</h4>
                  <p className="text-sm text-blue-700">Hide account numbers, credit card details, and financial data</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">HR Documents</h4>
                  <p className="text-sm text-blue-700">Remove employee SSNs, addresses, and salary information</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 