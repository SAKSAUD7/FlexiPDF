import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, can't be disabled
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('flexipdf-cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('flexipdf-cookie-consent', JSON.stringify(consent));
    setShowBanner(false);
    
    // Initialize analytics if accepted
    if (consent.analytics && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  const handleAcceptSelected = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('flexipdf-cookie-consent', JSON.stringify(consent));
    setShowBanner(false);
    
    // Initialize analytics based on selection
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied'
      });
    }
  };

  const handleDeclineAll = () => {
    const consent = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('flexipdf-cookie-consent', JSON.stringify(consent));
    setShowBanner(false);
    
    // Deny all non-essential cookies
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🍪 We use cookies to improve your experience
            </h3>
            <p className="text-sm text-gray-600">
              We use cookies to enhance your browsing experience, analyze site traffic, and provide 
              personalized content. Your files are never stored - only processing preferences and 
              anonymous usage data may be collected.
            </p>
            <div className="mt-3 text-xs text-gray-500">
              <a href="/privacy" className="text-primary-600 hover:text-primary-700 underline">
                Privacy Policy
              </a>
              {' • '}
              <a href="/terms" className="text-primary-600 hover:text-primary-700 underline">
                Terms of Service
              </a>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 sm:flex-row lg:ml-6">
            <button
              onClick={handleDeclineAll}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Decline All
            </button>
            <button
              onClick={() => setPreferences(prev => ({ ...prev, showDetails: !prev.showDetails }))}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Customize
            </button>
            <button
              onClick={handleAcceptAll}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Accept All
            </button>
          </div>
        </div>

        {preferences.showDetails && (
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Cookie Preferences</h4>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={preferences.essential}
                    disabled
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 disabled:opacity-50"
                  />
                </div>
                <div className="ml-3">
                  <label className="text-sm font-medium text-gray-900">
                    Essential Cookies
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Required for basic site functionality, file uploads, and security.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3">
                  <label className="text-sm font-medium text-gray-900">
                    Analytics Cookies
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Help us understand how visitors use our site to improve performance.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3">
                  <label className="text-sm font-medium text-gray-900">
                    Marketing Cookies
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Used to show relevant ads and measure campaign effectiveness.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAcceptSelected}
                className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 