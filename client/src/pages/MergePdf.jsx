import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentDuplicateIcon, DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline';
import GoogleAd from '../components/GoogleAd';

export default function MergePdf() {
  // ... existing state and handlers ...

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top Ad */}
        <div className="mb-8">
          <GoogleAd
            slot="merge-pdf-top"
            format="horizontal"
            style={{ minHeight: '90px', margin: '0 auto' }}
          />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Merge PDF Files
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Combine multiple PDF files into a single document while maintaining the original quality.
          </p>
        </div>

        {/* Side Ad */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <GoogleAd
            slot="merge-pdf-side"
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
              <DocumentDuplicateIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500"
                >
                  <span>Upload files</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PDF files up to 10MB each</p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-4">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-8 w-8 text-primary-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}

              <div className="flex justify-between">
                <button
                  onClick={handleMerge}
                  disabled={files.length < 2 || isMerging}
                  className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50"
                >
                  {isMerging ? 'Merging...' : 'Merge PDFs'}
                </button>
                <button
                  onClick={handleClearFiles}
                  className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Clear All
                </button>
              </div>
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
            slot="merge-pdf-bottom"
            format="horizontal"
            style={{ minHeight: '90px', margin: '0 auto' }}
          />
        </div>
      </div>
    </div>
  );
} 