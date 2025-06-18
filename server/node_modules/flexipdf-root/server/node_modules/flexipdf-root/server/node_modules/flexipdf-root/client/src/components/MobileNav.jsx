import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  DocumentDuplicateIcon, 
  PencilIcon, 
  ArrowsPointingOutIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid, 
  DocumentDuplicateIcon as DocumentDuplicateIconSolid, 
  PencilIcon as PencilIconSolid, 
  ArrowsPointingOutIcon as ArrowsPointingOutIconSolid,
  SparklesIcon as SparklesIconSolid,
} from '@heroicons/react/24/solid';

const navItems = [
  {
    name: 'Home',
    href: '/',
    icon: HomeIcon,
    iconSolid: HomeIconSolid,
  },
  {
    name: 'Merge',
    href: '/merge-pdf',
    icon: DocumentDuplicateIcon,
    iconSolid: DocumentDuplicateIconSolid,
  },
  {
    name: 'Edit',
    href: '/edit-pdf',
    icon: PencilIcon,
    iconSolid: PencilIconSolid,
    highlight: true,
  },
  {
    name: 'Compress',
    href: '/compress-pdf',
    icon: ArrowsPointingOutIcon,
    iconSolid: ArrowsPointingOutIconSolid,
  },
  {
    name: 'AI Chat',
    href: '/chat-with-pdf',
    icon: SparklesIcon,
    iconSolid: SparklesIconSolid,
    new: true,
  },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <div className="lg:hidden bottom-nav">
      <div className="flex">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = isActive ? item.iconSolid : item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`bottom-nav-item touch-target ${isActive ? 'active' : ''} ${
                item.highlight ? 'relative' : ''
              }`}
            >
              {item.highlight && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              )}
              
              <div className="relative">
                <Icon className={`h-5 w-5 mx-auto mb-1 ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                } ${item.highlight && !isActive ? 'text-purple-600' : ''}`} />
                
                {item.new && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                )}
              </div>
              
              <span className={`text-xs ${
                isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'
              } ${item.highlight && !isActive ? 'text-purple-600' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 