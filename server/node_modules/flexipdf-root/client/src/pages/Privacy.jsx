export default function Privacy() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Your privacy and file security are our top priorities. Learn how we protect your data.
          </p>
        </div>

        <div className="mt-16 prose prose-lg max-w-none">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-2">🔒 Key Privacy Promise</h3>
            <p className="text-green-700 mb-0">
              <strong>We DO NOT store your files.</strong> All PDF processing happens temporarily in memory, 
              and files are automatically deleted immediately after conversion.
            </p>
          </div>

          <h2>1. Information We Collect</h2>
          
          <h3>Files You Upload</h3>
          <ul>
            <li><strong>Temporary Processing Only:</strong> Files are processed in memory or temporary storage</li>
            <li><strong>Immediate Deletion:</strong> All files are deleted within seconds of processing</li>
            <li><strong>No Permanent Storage:</strong> We never save, backup, or store your files on our servers</li>
            <li><strong>No Content Analysis:</strong> We don't read, analyze, or extract content from your files</li>
          </ul>

          <h3>Technical Information</h3>
          <ul>
            <li>Browser type and version (for compatibility)</li>
            <li>Operating system (for optimization)</li>
            <li>IP address (for security and rate limiting)</li>
            <li>Usage statistics (anonymous, aggregated data only)</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          
          <h3>File Processing</h3>
          <ul>
            <li>Convert, merge, compress, or edit your PDF files as requested</li>
            <li>Provide the converted file for immediate download</li>
            <li>Ensure processing quality and error handling</li>
          </ul>

          <h3>Service Improvement</h3>
          <ul>
            <li>Monitor service performance and uptime</li>
            <li>Identify and fix technical issues</li>
            <li>Improve user experience based on usage patterns</li>
          </ul>

          <h2>3. File Security & Protection</h2>
          
          <h3>During Processing</h3>
          <ul>
            <li><strong>Encrypted Transmission:</strong> All file uploads use HTTPS encryption</li>
            <li><strong>Isolated Processing:</strong> Each file is processed in an isolated environment</li>
            <li><strong>Memory-Only Processing:</strong> Files are processed in RAM when possible</li>
            <li><strong>Automatic Cleanup:</strong> Temporary files are deleted after each operation</li>
          </ul>

          <h3>Access Controls</h3>
          <ul>
            <li>No human access to your files during processing</li>
            <li>Automated systems only, no manual intervention</li>
            <li>Secure server infrastructure with regular security updates</li>
          </ul>

          <h2>4. Data Sharing & Third Parties</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
            <p className="text-blue-800 mb-0">
              <strong>We DO NOT share your files with any third parties.</strong> All processing 
              is done locally on our servers using open-source libraries.
            </p>
          </div>

          <h3>Service Providers</h3>
          <ul>
            <li><strong>Hosting Provider:</strong> Our servers are hosted securely with enterprise-grade security</li>
            <li><strong>CDN Services:</strong> For faster file delivery (no file content stored)</li>
            <li><strong>Analytics:</strong> Anonymous usage statistics only (no file data)</li>
          </ul>

          <h2>5. Cookies & Tracking</h2>
          
          <h3>Essential Cookies</h3>
          <ul>
            <li>Session management for file uploads</li>
            <li>Security and CSRF protection</li>
            <li>User preference settings</li>
          </ul>

          <h3>Analytics Cookies</h3>
          <ul>
            <li>Anonymous usage statistics</li>
            <li>Performance monitoring</li>
            <li>Error tracking and debugging</li>
          </ul>

          <p>You can disable cookies in your browser settings, but this may affect functionality.</p>

          <h2>6. Your Rights</h2>
          
          <h3>Data Control</h3>
          <ul>
            <li><strong>File Deletion:</strong> Files are automatically deleted, no action needed</li>
            <li><strong>Access Request:</strong> Since we don't store files, there's no data to access</li>
            <li><strong>Data Portability:</strong> You always retain your original files</li>
            <li><strong>Processing Objection:</strong> Simply don't upload files if you object</li>
          </ul>

          <h2>7. Children's Privacy</h2>
          <p>
            FlexiPDF is not directed to children under 13. We do not knowingly collect 
            personal information from children under 13. If we learn we have collected 
            such information, we will delete it immediately.
          </p>

          <h2>8. International Data Transfers</h2>
          <p>
            Since we don't store your files, there are no international data transfers 
            of your file content. Processing happens locally on our servers and files 
            are deleted immediately after conversion.
          </p>

          <h2>9. Data Retention</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
            <p className="text-yellow-800 mb-0">
              <strong>File Retention: 0 seconds.</strong> Files are deleted immediately 
              after processing and download delivery.
            </p>
          </div>

          <ul>
            <li><strong>Uploaded Files:</strong> Deleted immediately after processing</li>
            <li><strong>Converted Files:</strong> Deleted after successful download</li>
            <li><strong>Temporary Data:</strong> Cleared from memory within seconds</li>
            <li><strong>Error Logs:</strong> May contain file names (not content) for 30 days</li>
          </ul>

          <h2>10. Security Measures</h2>
          <ul>
            <li>HTTPS encryption for all data transmission</li>
            <li>Regular security audits and updates</li>
            <li>Isolated processing environments</li>
            <li>Automatic file cleanup systems</li>
            <li>Access logging and monitoring</li>
          </ul>

          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this privacy policy periodically. Changes will be posted on 
            this page with an updated "Last Modified" date. We encourage you to review 
            this policy regularly.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have questions about this privacy policy or our privacy practices, 
            please contact us at:
          </p>
          <ul>
            <li><strong>Email:</strong> privacy@flexipdf.com</li>
            <li><strong>Address:</strong> [Your Business Address]</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
            <p className="text-sm text-gray-600 mb-0">
              <strong>Last Modified:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 