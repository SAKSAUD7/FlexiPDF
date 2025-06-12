import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PdfToWord from './pages/PdfToWord';
import MergePdf from './pages/MergePdf';
import CompressPdf from './pages/CompressPdf';
import PdfToPowerPoint from './pages/PdfToPowerPoint';
import PdfToExcel from './pages/PdfToExcel';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pdf-to-word" element={<PdfToWord />} />
          <Route path="/merge-pdf" element={<MergePdf />} />
          <Route path="/compress-pdf" element={<CompressPdf />} />
          <Route path="/pdf-to-powerpoint" element={<PdfToPowerPoint />} />
          <Route path="/pdf-to-excel" element={<PdfToExcel />} />
        </Routes>
      </main>
      <Footer />
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '0.5rem',
            padding: '1rem',
          },
          success: {
            iconTheme: {
              primary: '#0284c7',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App; 