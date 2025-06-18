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
  ShieldCheckIcon,
  SparklesIcon,
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

const features = [
  {
    name: 'Lightning Fast',
    description: 'Process PDFs in seconds with our optimized cloud infrastructure',
    icon: BoltIcon,
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    name: 'Bank-Level Security',
    description: 'Your files are encrypted and automatically deleted after processing',
    icon: ShieldCheckIcon,
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    name: 'AI-Powered',
    description: 'Advanced AI features for intelligent PDF processing and analysis',
    icon: SparklesIcon,
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    name: 'Mobile Optimized',
    description: 'Perfect experience on any device - desktop, tablet, or mobile',
    icon: DevicePhoneMobileIcon,
    gradient: 'from-blue-400 to-cyan-500',
  },
];

const stats = [
  { label: 'Files Processed', value: '10M+', icon: DocumentTextIcon },
  { label: 'Happy Users', value: '500K+', icon: UserGroupIcon },
  { label: 'Countries Served', value: '150+', icon: CheckCircleIcon },
  { label: 'Uptime', value: '99.9%', icon: StarIcon },
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Enhanced and More Beautiful */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen flex items-center">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          {/* Floating geometric shapes with better animations */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-2xl rotate-12 animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-purple-400/25 to-pink-500/25 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-gradient-to-br from-orange-400/25 to-red-500/25 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Enhanced gradient orbs */}
          <div className="absolute top-1/4 left-1/5 w-32 h-32 bg-gradient-to-r from-blue-300/20 to-purple-400/20 rounded-full filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-300/15 to-violet-400/15 rounded-full filter blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Additional decorative elements */}
          <div className="absolute top-16 right-1/4 w-6 h-6 bg-yellow-400/40 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-20 right-10 w-10 h-10 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-lg rotate-12 animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        </div>
        
        <div className="relative container-fluid">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
            <div className={`space-y-8 fade-in ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000`}>
              <div className="space-y-6">
                {/* Enhanced New Badge */}
                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-full px-5 py-3 border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="relative">
                    <FireIcon className="h-5 w-5 text-orange-500" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">New AI Features Available</span>
                  <span className="text-xs bg-gradient-to-r from-violet-500 to-purple-600 text-white px-3 py-1.5 rounded-full font-bold shadow-md animate-pulse">
                    NEW
                  </span>
                </div>
                
                {/* Enhanced Main Heading */}
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="block text-gray-900 animate-fade-in">Transform</span>
                  <span className="block text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    PDFs Effortlessly
                  </span>
                  <span className="block text-gray-900 text-4xl md:text-5xl mt-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>with AI Power</span>
                </h1>
                
                {/* Enhanced Subtitle */}
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  The world's most complete PDF toolkit with <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">35+ professional tools</span>. 
                  Convert, edit, organize, and analyze your documents with lightning speed.
                </p>

                {/* Enhanced Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg animate-fade-in" style={{ animationDelay: '0.8s' }}>
                  {[
                    { icon: '⚡', text: 'Lightning Fast Processing', color: 'from-yellow-400 to-orange-500' },
                    { icon: '🔒', text: 'Bank-Level Security', color: 'from-green-400 to-emerald-500' },
                    { icon: '🤖', text: 'AI-Powered Features', color: 'from-purple-400 to-pink-500' },
                    { icon: '📱', text: 'Works on All Devices', color: 'from-blue-400 to-cyan-500' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 text-gray-700 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                      <div className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-sm`}>
                        {feature.icon}
                      </div>
                      <span className="text-sm font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '1s' }}>
                <Link
                  to="/edit-pdf"
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center space-x-3">
                    <span className="text-lg">Start Editing Free</span>
                    <BoltIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </div>
                </Link>
                
                <Link 
                  to="/chat-with-pdf" 
                  className="group bg-white/90 backdrop-blur-sm text-gray-700 font-semibold px-8 py-4 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:bg-white transition-all duration-300 text-center shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-lg">Try AI Chat</span>
                    <SparklesIcon className="h-5 w-5 group-hover:rotate-12 transition-transform text-purple-600" />
                  </div>
                </Link>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={stat.label} className={`text-center slide-up group cursor-pointer`} style={{ animationDelay: `${index * 150 + 1200}ms` }}>
                    <div className="flex justify-center mb-3">
                      <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Image Section */}
            <div className={`relative scale-in ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} transition-all duration-1000 delay-300`}>
              <div className="relative group">
                {/* Enhanced floating elements with better positioning */}
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl shadow-2xl icon-float group-hover:scale-110 transition-transform duration-500">
                  <div className="w-full h-full flex items-center justify-center">
                    <DocumentTextIcon className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                <div className="absolute -top-3 -right-8 w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl shadow-xl icon-bounce group-hover:scale-110 transition-transform duration-500">
                  <div className="w-full h-full flex items-center justify-center">
                    <PencilIcon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="absolute -bottom-8 -left-3 w-18 h-18 bg-gradient-to-br from-pink-400 to-pink-600 rounded-3xl shadow-xl icon-pulse group-hover:scale-110 transition-transform duration-500">
                  <div className="w-full h-full flex items-center justify-center">
                    <SparklesIcon className="h-9 w-9 text-white" />
                  </div>
                </div>

                {/* Main Image with Enhanced Effects */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-white to-gray-50 p-8 border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                  <img
                    src="/hero-image.png"
                    alt="FlexiPDF Tools Dashboard"
                    className="w-full rounded-2xl shadow-xl hover-lift transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  
                  {/* Fallback content if image doesn't load */}
                  <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-xl hidden items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                        <DocumentTextIcon className="h-10 w-10 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">FlexiPDF Dashboard</h3>
                        <p className="text-gray-600">Professional PDF Tools</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced overlay glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Enhanced floating badges */}
                <div className="absolute top-1/2 -right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Online</span>
                  </div>
                </div>

                <div className="absolute bottom-1/4 -left-6 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-gray-200 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    <span className="text-xs font-medium text-gray-700">Secure</span>
                  </div>
                </div>

                {/* New trust badge */}
                <div className="absolute top-1/4 -left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg px-3 py-2 shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-3 w-3" />
                    <span className="text-xs font-bold">5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Tools by Category - MOVED TO TOP PRIORITY */}
      <div className="container-fluid section-padding">
        <div className="text-center mb-16">
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

        <div className="space-y-12">
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
                style={{ animationDelay: `${categoryIndex * 200}ms` }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`h-2 w-12 bg-gradient-to-r ${gradients[category]} rounded-full`}></div>
                  <h3 className="text-2xl font-bold text-gray-900">{category}</h3>
                  {category === 'AI Features' && (
                    <span className="bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                      <FireIcon className="h-3 w-3 mr-1" />
                      NEW
                    </span>
                  )}
                </div>
                
                <div className="grid-auto-fill">
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

      {/* Popular Tools Section - Now Secondary */}
      <div className="container-fluid section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center mb-16">
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

        <div className="grid-auto-fit">
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

      {/* Features Section - Enhanced */}
      <div className="container-fluid section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why{' '}
            <span className="text-gradient">FlexiPDF</span> 
            {' '}stands out
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built for professionals who demand the best. Our platform combines power, 
            security, and ease of use in one comprehensive solution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.name} 
              className={`text-center fade-in mobile-optimized`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative group mb-6">
                <div className={`h-16 w-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-all duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.name}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section - Enhanced */}
      <div className="container-fluid section-padding">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 md:p-16 text-center">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to transform your PDFs?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join millions of users who trust FlexiPDF for their document processing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/edit-pdf"
                className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Start Editing Now
              </Link>
              <Link
                to="/merge-pdf"
                className="bg-blue-500/20 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                Try Tools Free
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Google Ad */}
      <div className="container-fluid py-8">
        <GoogleAd />
      </div>
    </div>
  );
} 