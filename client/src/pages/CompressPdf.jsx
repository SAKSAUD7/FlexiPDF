import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentMinusIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import GoogleAd from '../components/GoogleAd';

export default function CompressPdf() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
        setError(null);
      }
    },
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const handleCompress = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file to compress');
      return;
    }

    setIsCompressing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/pdf/compress', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to compress PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `compressed_${selectedFile.name}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setSelectedFile(null);
    } catch (err) {
      setError(err.message || 'An error occurred while compressing the PDF');
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top Ad */}
        <div className="mb-8">
          <GoogleAd
            slot="compress-pdf-top"
            format="horizontal"
            style={{ minHeight: '90px', margin: '0 auto' }}
          />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Compress PDF
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Reduce the size of your PDF files while maintaining quality. Perfect for sharing and uploading.
          </p>
        </div>

        {/* Side Ad */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <GoogleAd
            slot="compress-pdf-side"
            format="vertical"
            style={{ width: '160px', minHeight: '600px' }}
          />
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <div
            {...getRootProps()}
            className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
          >
            <div className="text-center">
              <DocumentMinusIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" {...getInputProps()} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PDF up to 10MB</p>
            </div>
          </div>

          {selectedFile && (
            <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-200 p-4">
              <div className="flex items-center">
                <DocumentTextIcon className="h-8 w-8 text-primary-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                onClick={handleCompress}
                disabled={isCompressing}
                className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50"
              >
                {isCompressing ? 'Compressing...' : 'Compress PDF'}
              </button>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Ad */}
        <div className="mt-8">
          <GoogleAd
            slot="compress-pdf-bottom"
            format="horizontal"
            style={{ minHeight: '90px', margin: '0 auto' }}
          />
        </div>
      </div>
    </div>
  );
} 