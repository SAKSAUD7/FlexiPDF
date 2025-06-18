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
  PencilIcon as DocumentPencilIcon,
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

  // Edit & Secure Tools
  {
    name: 'Edit PDF',
    description: 'Edit text, images, and more in your PDF',
    icon: DocumentPencilIcon,
    href: '/edit-pdf',
    category: 'Edit & Secure',
    popular: true,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Sign PDF',
    description: 'Add digital signatures to your PDF',
    icon: DocumentCheckIcon,
    href: '/sign-pdf',
    category: 'Edit & Secure',
    popular: true,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Add Watermark',
    description: 'Add text or image watermarks to PDF',
    icon: DocumentPlusIcon,
    href: '/add-watermark',
    category: 'Edit & Secure',
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

const categories = ['Convert', 'Organize', 'Edit & Secure', 'Optimize', 'AI Features'];
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
      {/* Hero Section - Enhanced */}
      <div className="relative isolate overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full filter blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400 rounded-full filter blur-xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/2 w-40 h-40 bg-pink-400 rounded-full filter blur-xl animate-pulse delay-2000"></div>
          </div>
        </div>
        
        <div className="container-fluid section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 fade-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-200/50">
                  <FireIcon className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-semibold text-gray-800">New AI Features Available</span>
                  <span className="text-xs bg-gradient-to-r from-violet-500 to-purple-600 text-white px-2 py-1 rounded-full font-bold">
                    NEW
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Transform PDFs with{' '}
                  <span className="text-gradient">
                    AI Power
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  The most complete PDF toolkit with 35+ professional tools. Convert, edit, organize, 
                  and analyze your documents with lightning speed and AI intelligence.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/edit-pdf"
                  className="btn-primary text-center group"
                >
                  <span>Start Editing Free</span>
                  <BoltIcon className="inline-block h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
                </Link>
                <Link 
                  to="/chat-with-pdf" 
                  className="btn-secondary text-center group"
                >
                  <span>Try AI Chat</span>
                  <SparklesIcon className="inline-block h-4 w-4 ml-2 group-hover:rotate-12 transition-transform" />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div key={stat.label} className={`text-center slide-up delay-${index * 100}`}>
                    <div className="flex justify-center mb-2">
                      <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <stat.icon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative scale-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="relative">
                {/* Floating cards for visual appeal */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-lg icon-float"></div>
                <div className="absolute -top-2 -right-6 w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl shadow-lg icon-bounce"></div>
                <div className="absolute -bottom-6 -left-2 w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl shadow-lg icon-pulse"></div>
                
                <img
                  src="/hero-image.png"
                  alt="FlexiPDF Tools Dashboard"
                  className="w-full rounded-2xl shadow-strong hover-lift"
                />
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
              'Edit & Secure': 'from-purple-500 to-pink-500',
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