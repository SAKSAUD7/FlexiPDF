import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { ArrowLeftIcon, DocumentArrowUpIcon, DocumentTextIcon, XMarkIcon, SparklesIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { uploadFile } from '../utils/api';
import toast from 'react-hot-toast';

export default function PdfSummarizer() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState('');
  const [summaryLength, setSummaryLength] = useState('medium');
  const navigate = useNavigate();

  const handleFileSelect = (selectedFiles) => {
    setFiles(selectedFiles);
    setSummary(''); // Clear previous summary
  };

  const handleRemoveFile = () => {
    setFiles([]);
    setSummary('');
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file to summarize');
      return;
    }

    setIsProcessing(true);
    const loadingToast = toast.loading('AI is analyzing and summarizing your PDF...');

    try {
      const response = await uploadFile('/api/pdf/summarize', files[0], {
        length: summaryLength
      });
      
      // Since this returns text, not a blob
      const summaryText = await response.text();
      setSummary(summaryText);
      toast.success('PDF summarized successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Error summarizing PDF:', error);
      toast.error(error.message || 'Failed to summarize PDF. Please try again.', { id: loadingToast });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summary);
    toast.success('Summary copied to clipboard!');
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

  const lengthOptions = [
    { value: 'short', label: 'Short', description: 'Quick overview, 2-3 sentences' },
    { value: 'medium', label: 'Medium', description: 'Balanced summary, 1-2 paragraphs' },
    { value: 'long', label: 'Detailed', description: 'Comprehensive summary, multiple paragraphs' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center mb-4">
                <SparklesIcon className="h-8 w-8 text-purple-600 mr-2" />
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  AI PDF Summarizer
                </h1>
              </div>
              <p className="text-lg text-gray-600">
                Get intelligent summaries of your PDF documents powered by advanced AI. Extract key insights and main points instantly.
              </p>
            </div>
          </div>

          {/* Summary Length Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">Summary Length</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lengthOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSummaryLength(option.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    summaryLength === option.value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900">{option.label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Area */}
          <div className="mb-8">
            <div
              {...getRootProps()}
              className={`relative rounded-2xl border-2 border-dashed p-12 text-center transition-colors ${
                isDragActive
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 hover:border-purple-500 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
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
                        <DocumentTextIcon className="h-8 w-8 text-purple-600" />
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
                        className="flex items-center space-x-2 rounded-full bg-purple-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <SparklesIcon className="h-4 w-4" />
                        <span>{isProcessing ? 'Summarizing...' : 'Summarize PDF'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Summary Result */}
          {summary && (
            <div className="mb-8">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <SparklesIcon className="h-5 w-5 text-purple-600 mr-2" />
                    AI Summary
                  </h3>
                  <button
                    onClick={handleCopySummary}
                    className="flex items-center space-x-2 text-sm text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <ClipboardDocumentIcon className="h-4 w-4" />
                    <span>Copy</span>
                  </button>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{summary}</p>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <SparklesIcon className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900">AI-Powered</h3>
              <p className="mt-2 text-sm text-gray-600">
                Advanced AI algorithms analyze and extract key information from your documents.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <DocumentTextIcon className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900">Key Insights</h3>
              <p className="mt-2 text-sm text-gray-600">
                Get the main points, important details, and essential information quickly.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <ClipboardDocumentIcon className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900">Easy Export</h3>
              <p className="mt-2 text-sm text-gray-600">
                Copy summaries to clipboard or use them in your reports and presentations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 