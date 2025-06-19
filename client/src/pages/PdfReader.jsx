import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { ArrowLeftIcon, DocumentTextIcon, XMarkIcon, BookOpenIcon, MagnifyingGlassIcon, ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function PdfReader() {
  const [files, setFiles] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [zoom, setZoom] = useState(100);
  const navigate = useNavigate();

  const handleFileSelect = (selectedFiles) => {
    const file = selectedFiles[0];
    setFiles(selectedFiles);
    
    // Create object URL for PDF viewing
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
    toast.success('PDF loaded successfully!');
  };

  const handleRemoveFile = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    setFiles([]);
    setPdfUrl(null);
    setCurrentPage(1);
    setTotalPages(0);
    setZoom(100);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
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
              PDF Reader
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              View and read PDF documents directly in your browser. No downloads required.
            </p>
          </div>

          {!pdfUrl ? (
            // Upload Area
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
                <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
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

              {/* Features */}
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-2xl bg-gray-50 p-6">
                  <h3 className="text-lg font-semibold text-gray-900">Secure Viewing</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Documents are processed locally in your browser for maximum security.
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-6">
                  <h3 className="text-lg font-semibold text-gray-900">No Downloads</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    View PDFs instantly without downloading software or apps.
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-6">
                  <h3 className="text-lg font-semibold text-gray-900">Full Features</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Zoom, navigate pages, and view documents with full functionality.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // PDF Viewer
            <div className="mt-8">
              {/* File Info and Controls */}
              <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
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

              {/* PDF Viewer Controls */}
              <div className="mb-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage <= 1}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                      <ArrowLeftCircleIcon className="h-4 w-4" />
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages || '?'}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      disabled={currentPage >= totalPages}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                      <ArrowRightCircleIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleZoomOut}
                      className="px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="text-sm text-gray-600 w-16 text-center">{zoom}%</span>
                    <button
                      onClick={handleZoomIn}
                      className="px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-100">
                <div className="h-96 md:h-[600px] flex items-center justify-center">
                  <iframe
                    src={`${pdfUrl}#page=${currentPage}&zoom=${zoom}`}
                    className="w-full h-full"
                    title="PDF Viewer"
                    onLoad={() => {
                      // In a real implementation, you would extract the total pages from the PDF
                      setTotalPages(10); // Placeholder
                    }}
                  />
                </div>
              </div>

              {/* Alternative: Canvas-based PDF viewer message */}
              <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> For better PDF viewing experience, we recommend using a modern browser 
                  with built-in PDF support. Some features may require additional PDF viewer libraries.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 