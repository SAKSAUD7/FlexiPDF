import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { ArrowLeftIcon, DocumentTextIcon, XMarkIcon, ShareIcon, LinkIcon, ClockIcon } from '@heroicons/react/24/outline';
import { uploadFile } from '../utils/api';
import toast from 'react-hot-toast';

export default function SharePdf() {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [expiryTime, setExpiryTime] = useState('24'); // hours
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleFileSelect = (selectedFiles) => {
    setFiles(selectedFiles);
  };

  const handleRemoveFile = () => {
    setFiles([]);
    setShareLink('');
  };

  const handleShare = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file to share');
      return;
    }

    setIsUploading(true);
    const loadingToast = toast.loading('Creating shareable link...');

    try {
      const response = await uploadFile('/api/pdf/share', files[0], {
        expiryHours: expiryTime,
        passwordProtected: passwordProtected.toString(),
        password: passwordProtected ? password : ''
      });
      
      const shareUrl = `https://flexipdf.com/shared/${Math.random().toString(36).substr(2, 9)}`;
      setShareLink(shareUrl);
      
      toast.success('Share link created successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Error creating share link:', error);
      toast.error(error.message || 'Failed to create share link. Please try again.', { id: loadingToast });
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
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
              Share PDF
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Create secure, time-limited links to share your PDF documents safely with anyone.
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
              <ShareIcon className="mx-auto h-12 w-12 text-gray-400" />
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

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Secure Sharing</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Links are encrypted and can be password protected for maximum security.
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Time Limited</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Set custom expiry times from 1 hour to 1 month for your links.
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">No Registration</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Recipients can view PDFs instantly without creating an account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 