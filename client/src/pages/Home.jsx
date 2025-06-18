import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  PencilIcon,
  ArrowDownTrayIcon as DocumentArrowDownIcon,
  BoltIcon,
  PhotoIcon,
  TableCellsIcon,
  PresentationChartBarIcon,
  ScissorsIcon,
  ArrowPathIcon,
  RectangleStackIcon,
  HashtagIcon,
  EyeIcon,
  ShareIcon,
  ChatBubbleLeftRightIcon,
  LanguageIcon,
  CpuChipIcon,
  WrenchScrewdriverIcon,
  DevicePhoneMobileIcon,
  FireIcon,
  StarIcon,
  CheckCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import GoogleAd from '../components/GoogleAd';

const tools = [
  // Convert Tools
  {
    name: 'Word to PDF',
    description: 'Convert Word documents to PDF format instantly',
    icon: DocumentTextIcon,
    href: '/word-to-pdf',
    category: 'Convert',
    popular: true,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'PDF to Word',
    description: 'Convert PDF to editable Word documents',
    icon: DocumentTextIcon,
    href: '/pdf-to-word',
    category: 'Convert',
    popular: true,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'JPG to PDF',
    description: 'Convert images to PDF documents',
    icon: PhotoIcon,
    href: '/jpg-to-pdf',
    category: 'Convert',
    popular: true,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'PDF to JPG',
    description: 'Convert PDF pages to JPG images',
    icon: PhotoIcon,
    href: '/pdf-to-jpg',
    category: 'Convert',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Excel to PDF',
    description: 'Convert Excel spreadsheets to PDF',
    icon: TableCellsIcon,
    href: '/excel-to-pdf',
    category: 'Convert',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'PDF to Excel',
    description: 'Convert PDF tables to Excel format',
    icon: TableCellsIcon,
    href: '/pdf-to-excel',
    category: 'Convert',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'PowerPoint to PDF',
    description: 'Convert presentations to PDF',
    icon: PresentationChartBarIcon,
    href: '/powerpoint-to-pdf',
    category: 'Convert',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'PDF to PowerPoint',
    description: 'Convert PDF to editable presentations',
    icon: PresentationChartBarIcon,
    href: '/pdf-to-powerpoint',
    category: 'Convert',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'HTML to PDF',
    description: 'Convert web pages to PDF documents',
    icon: DocumentArrowUpIcon,
    href: '/html-to-pdf',
    category: 'Convert',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'PDF to PDF/A',
    description: 'Convert PDF to archival PDF/A format',
    icon: DocumentArrowDownIcon,
    href: '/pdf-to-pdf-a',
    category: 'Convert',
    color: 'from-emerald-500 to-teal-500',
  },

  // Organize Tools
  {
    name: 'Merge PDF',
    description: 'Combine multiple PDFs into one document',
    icon: DocumentDuplicateIcon,
    href: '/merge-pdf',
    category: 'Organize',
    popular: true,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'Split PDF',
    description: 'Separate pages into independent PDF files',
    icon: ScissorsIcon,
    href: '/split-pdf',
    category: 'Organize',
    popular: true,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'Rotate PDF',
    description: 'Rotate PDF pages to the correct orientation',
    icon: ArrowPathIcon,
    href: '/rotate-pdf',
    category: 'Organize',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'Extract Pages',
    description: 'Extract specific pages from PDF',
    icon: RectangleStackIcon,
    href: '/extract-pages',
    category: 'Organize',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'Remove Pages',
    description: 'Delete unwanted pages from PDF',
    icon: DocumentMinusIcon,
    href: '/remove-pages',
    category: 'Organize',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'Organize PDF',
    description: 'Reorder and organize PDF pages',
    icon: RectangleStackIcon,
    href: '/organize-pdf',
    category: 'Organize',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'Add Page Numbers',
    description: 'Add page numbers to your PDF',
    icon: HashtagIcon,
    href: '/add-page-numbers',
    category: 'Organize',
    color: 'from-blue-500 to-indigo-500',
  },

  // Editor Tools (renamed from Edit & Secure)
  {
    name: 'Edit PDF',
    description: 'Edit text, images, and more in your PDF',
    icon: PencilIcon,
    href: '/edit-pdf',
    category: 'Editor',
    popular: true,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Sign PDF',
    description: 'Add digital signatures to your PDF',
    icon: DocumentCheckIcon,
    href: '/sign-pdf',
    category: 'Editor',
    popular: true,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Add Watermark',
    description: 'Add text or image watermarks to PDF',
    icon: DocumentPlusIcon,
    href: '/add-watermark',
    category: 'Editor',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Crop PDF',
    description: 'Crop and resize PDF pages',
    icon: ScissorsIcon,
    href: '/crop-pdf',
    category: 'Editor',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Redact PDF',
    description: 'Remove sensitive information from PDF',
    icon: DocumentMinusIcon,
    href: '/redact-pdf',
    category: 'Editor',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Protect PDF',
    description: 'Add password protection to PDF',
    icon: DocumentLockClosedIcon,
    href: '/protect-pdf',
    category: 'Editor',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Unlock PDF',
    description: 'Remove password protection from PDF',
    icon: DocumentLockOpenIcon,
    href: '/unlock-pdf',
    category: 'Editor',
    color: 'from-purple-500 to-pink-500',
  },

  // Optimize Tools
  {
    name: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality',
    icon: DocumentMinusIcon,
    href: '/compress-pdf',
    category: 'Optimize',
    popular: true,
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'OCR PDF',
    description: 'Convert scanned PDFs to searchable text',
    icon: DocumentMagnifyingGlassIcon,
    href: '/ocr-pdf',
    category: 'Optimize',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Compare PDFs',
    description: 'Find differences between two PDFs',
    icon: DocumentDuplicateIcon,
    href: '/compare-pdfs',
    category: 'Optimize',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Repair PDF',
    description: 'Fix corrupted or damaged PDFs',
    icon: WrenchScrewdriverIcon,
    href: '/repair-pdf',
    category: 'Optimize',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Flatten PDF',
    description: 'Flatten PDF forms and annotations',
    icon: DocumentArrowDownIcon,
    href: '/flatten-pdf',
    category: 'Optimize',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'PDF Reader',
    description: 'View and read PDF documents online',
    icon: EyeIcon,
    href: '/pdf-reader',
    category: 'Optimize',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Share PDF',
    description: 'Share PDFs with secure links',
    icon: ShareIcon,
    href: '/share-pdf',
    category: 'Optimize',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Scan to PDF',
    description: 'Scan documents and convert to PDF',
    icon: DevicePhoneMobileIcon,
    href: '/scan-to-pdf',
    category: 'Optimize',
    color: 'from-orange-500 to-red-500',
  },

  // AI Features
  {
    name: 'Chat with PDF',
    description: 'Ask questions about your PDF content using AI',
    icon: ChatBubbleLeftRightIcon,
    href: '/chat-with-pdf',
    category: 'AI Features',
    new: true,
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'PDF Summarizer',
    description: 'Get AI-powered summaries of your PDFs',
    icon: CpuChipIcon,
    href: '/pdf-summarizer',
    category: 'AI Features',
    new: true,
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Translate PDF',
    description: 'Translate PDF content to different languages',
    icon: LanguageIcon,
    href: '/translate-pdf',
    category: 'AI Features',
    new: true,
    color: 'from-violet-500 to-purple-600',
  },
];

const categories = ['Convert', 'Organize', 'Editor', 'Optimize', 'AI Features'];
const popularTools = tools.filter(tool => tool.popular);



export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* All Tools by Category - MOVED TO TOP PRIORITY */}
      <div className="pt-20 pb-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-fluid">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <BoltIcon className="h-4 w-4" />
              <span>Complete PDF Toolkit</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              All{' '}
              <span className="text-gradient">PDF tools</span>
              {' '}you need
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              35+ professional PDF tools organized by category. Convert, edit, organize, optimize, and AI-powered features.
            </p>
          </div>

          <div className="space-y-8">
            {categories.map((category, categoryIndex) => {
              const categoryTools = tools.filter(tool => tool.category === category);
              const gradients = {
                'Convert': 'from-emerald-500 to-teal-500',
                'Organize': 'from-blue-500 to-indigo-500',
                'Editor': 'from-purple-500 to-pink-500',
                'Optimize': 'from-orange-500 to-red-500',
                'AI Features': 'from-violet-500 to-purple-600'
              };
              
              return (
                <div 
                  key={category} 
                  className={`slide-up`}
                  style={{ animationDelay: `${categoryIndex * 100}ms` }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`h-2 w-12 bg-gradient-to-r ${gradients[category]} rounded-full`}></div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">{category}</h3>
                    {category === 'AI Features' && (
                      <span className="bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                        <FireIcon className="h-3 w-3 mr-1" />
                        NEW
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryTools.map((tool, index) => (
                      <Link
                        key={tool.name}
                        to={tool.href}
                        className="app-card group p-4 mobile-optimized hover-lift"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`h-10 w-10 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                            <tool.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                                {tool.name}
                              </h4>
                              {tool.popular && (
                                <span className="bg-blue-100 text-blue-600 text-xs font-medium px-1.5 py-0.5 rounded">
                                  Popular
                                </span>
                              )}
                              {tool.new && (
                                <span className="bg-green-100 text-green-600 text-xs font-medium px-1.5 py-0.5 rounded">
                                  NEW
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 truncate">{tool.description}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>



      {/* Popular Tools Section - Compact */}
      <div className="py-16 bg-white">
        <div className="container-fluid">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <StarIcon className="h-4 w-4" />
              <span>Most Popular</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Start with these{' '}
              <span className="text-gradient">trending tools</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The most used PDF tools by millions of users worldwide. Fast, reliable, and always free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularTools.map((tool, index) => (
              <Link
                key={tool.name}
                to={tool.href}
                className={`app-card group mobile-optimized slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-12 w-12 bg-gradient-to-r ${tool.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                    {tool.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 flex-grow leading-relaxed">
                    {tool.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                    <span>Try it now</span>
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>



      {/* Google Ads */}
      <GoogleAd slot="your-ad-slot-id" />
    </div>
  );
}
