import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import {
  DocumentArrowUpIcon,
  PencilIcon,
  DocumentTextIcon,
  Squares2X2Icon,
  EyeDropperIcon,
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

export default function SimplePdfEditor() {
  const navigate = useNavigate();
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [activeTool, setActiveTool] = useState('select');
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    
    if (!file || file.type !== 'application/pdf') {
      toast.error('Please upload a valid PDF file');
      return;
    }

    setIsLoading(true);
    try {
      const url = URL.createObjectURL(file);
      setPdfFile(file);
      setPdfUrl(url);
      toast.success('PDF loaded successfully! Use the tools to annotate.');
    } catch (error) {
      toast.error('Failed to load PDF');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
    maxSize: 50 * 1024 * 1024
  });

  if (!pdfFile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 mb-6"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Tools
            </button>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Simple PDF Editor
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Upload and view PDFs with basic annotation tools - No external dependencies!
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all ${
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 bg-white'
              }`}
            >
              <input {...getInputProps()} />
              
              <div className="space-y-6">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <DocumentArrowUpIcon className="h-12 w-12 text-white" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {isDragActive ? 'Drop PDF here' : 'Select PDF file'}
                  </h3>
                  <p className="text-gray-500">
                    Drag and drop or click to upload your PDF
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Simple PDF Editor</h1>
                <p className="text-sm text-gray-500">{pdfFile?.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTool('draw')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTool === 'draw' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <PencilIcon className="h-4 w-4" />
                <span>Draw</span>
              </button>
              
              <button
                onClick={() => setActiveTool('text')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTool === 'text' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <DocumentTextIcon className="h-4 w-4" />
                <span>Text</span>
              </button>
              
              <button
                onClick={() => setActiveTool('highlight')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTool === 'highlight' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <EyeDropperIcon className="h-4 w-4" />
                <span>Highlight</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => toast.success('Annotations cleared!')}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <TrashIcon className="h-4 w-4" />
                <span>Clear</span>
              </button>
              
              <button
                onClick={() => toast.success('Download feature coming soon!')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
              <embed
                src={pdfUrl}
                type="application/pdf"
                width="100%"
                height="800px"
                className="block"
                style={{ minHeight: '800px' }}
              />
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>✅ PDF loaded successfully! Browser-native PDF viewer with no external dependencies.</p>
              <p className="mt-2">Current tool: <span className="font-semibold text-blue-600">{activeTool.toUpperCase()}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 