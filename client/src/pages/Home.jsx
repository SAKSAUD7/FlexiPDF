import { Link } from 'react-router-dom';
import {
  ArrowUpTrayIcon as DocumentArrowUpIcon,
  DocumentDuplicateIcon,
  MagnifyingGlassIcon as DocumentMagnifyingGlassIcon,
  DocumentTextIcon,
  ChartBarIcon as DocumentChartBarIcon,
  PlusIcon as DocumentPlusIcon,
  MinusIcon as DocumentMinusIcon,
  CheckIcon as DocumentCheckIcon,
  LockClosedIcon as DocumentLockClosedIcon,
  LockOpenIcon as DocumentLockOpenIcon,
  PencilIcon as DocumentPencilIcon,
  ArrowDownTrayIcon as DocumentArrowDownIcon,
  ShieldCheckIcon,
  SparklesIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';
import GoogleAd from '../components/GoogleAd';

const tools = [
  {
    name: 'PDF to Word',
    description: 'Convert PDF to editable Word documents',
    icon: DocumentTextIcon,
    href: '/pdf-to-word',
    category: 'Convert',
  },
  {
    name: 'Merge PDF',
    description: 'Combine multiple PDFs into one document',
    icon: DocumentDuplicateIcon,
    href: '/merge-pdf',
    category: 'Organize',
  },
  {
    name: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality',
    icon: DocumentMinusIcon,
    href: '/compress-pdf',
    category: 'Optimize',
  },
  {
    name: 'PDF to PowerPoint',
    description: 'Convert PDF to editable PowerPoint presentations',
    icon: DocumentChartBarIcon,
    href: '/pdf-to-powerpoint',
    category: 'Convert',
  },
  {
    name: 'PDF to Excel',
    description: 'Extract tables from PDF to Excel spreadsheets',
    icon: DocumentChartBarIcon,
    href: '/pdf-to-excel',
    category: 'Convert',
  },
  {
    name: 'Word to PDF',
    description: 'Convert Word documents to PDF format',
    icon: DocumentArrowUpIcon,
    href: '/word-to-pdf',
    category: 'Convert',
  },
  {
    name: 'Edit PDF',
    description: 'Edit text, images, and more in your PDF',
    icon: DocumentPencilIcon,
    href: '/edit-pdf',
    category: 'Edit',
  },
  {
    name: 'PDF to JPG',
    description: 'Convert PDF pages to JPG images',
    icon: DocumentArrowDownIcon,
    href: '/pdf-to-jpg',
    category: 'Convert',
  },
  {
    name: 'Sign PDF',
    description: 'Add digital signatures to your PDF',
    icon: DocumentCheckIcon,
    href: '/sign-pdf',
    category: 'Security',
  },
  {
    name: 'Add Watermark',
    description: 'Add text or image watermarks to PDF',
    icon: DocumentPlusIcon,
    href: '/add-watermark',
    category: 'Security',
  },
  {
    name: 'Protect PDF',
    description: 'Add password protection to your PDF',
    icon: DocumentLockClosedIcon,
    href: '/protect-pdf',
    category: 'Security',
  },
  {
    name: 'Unlock PDF',
    description: 'Remove password protection from PDF',
    icon: DocumentLockOpenIcon,
    href: '/unlock-pdf',
    category: 'Security',
  },
  {
    name: 'OCR PDF',
    description: 'Convert scanned PDFs to searchable text',
    icon: DocumentMagnifyingGlassIcon,
    href: '/ocr-pdf',
    category: 'Convert',
  },
  {
    name: 'Compare PDFs',
    description: 'Find differences between two PDFs',
    icon: DocumentDuplicateIcon,
    href: '/compare-pdfs',
    category: 'Tools',
  },
  {
    name: 'Redact PDF',
    description: 'Remove sensitive information from PDF',
    icon: DocumentMinusIcon,
    href: '/redact-pdf',
    category: 'Security',
  },
  {
    name: 'Crop PDF',
    description: 'Crop PDF pages to specific dimensions',
    icon: DocumentMinusIcon,
    href: '/crop-pdf',
    category: 'Edit',
  },
];

const categories = [...new Set(tools.map(tool => tool.category))];

const features = [
  {
    name: 'Fast & Secure',
    description: 'Process your PDFs quickly with enterprise-grade security',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Easy to Use',
    description: 'Simple, intuitive interface for all your PDF needs',
    icon: SparklesIcon,
  },
  {
    name: 'Instant Results',
    description: 'Get your converted files in seconds',
    icon: BoltIcon,
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-primary-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-primary-600/10 px-3 py-1 text-sm font-semibold leading-6 text-primary-600 ring-1 ring-inset ring-primary-600/10">
                  What's new
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                  <span>Just shipped v1.0</span>
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl animate-fade-in">
              Transform Your PDFs with Ease
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 animate-slide-up">
              The all-in-one PDF solution for professionals. Convert, edit, and manage your PDF files with our powerful suite of tools.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/pdf-to-word"
                className="rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-200 hover:scale-105"
              >
                Get Started
              </Link>
              <Link to="/merge-pdf" className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <img
                src="/hero-image.png"
                alt="App screenshot"
                className="w-full rounded-xl bg-white/5 shadow-2xl ring-1 ring-white/10 transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Why Choose FlexiPDF</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to manage your PDFs
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our comprehensive suite of tools makes PDF management simple and efficient.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col group">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Tools</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            All the PDF tools you need
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose from our wide range of PDF tools to get your work done efficiently.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              to={tool.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex h-14 items-center justify-center bg-primary-600/10">
                <tool.icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary-600">{tool.category}</p>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600">{tool.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 