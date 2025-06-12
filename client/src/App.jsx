import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import PdfToWord from './pages/PdfToWord';
import MergePdf from './pages/MergePdf';
import CompressPdf from './pages/CompressPdf';
import PdfToPowerPoint from './pages/PdfToPowerPoint';
import PdfToExcel from './pages/PdfToExcel';
import WordToPdf from './pages/WordToPdf';
import PdfToJpg from './pages/PdfToJpg';
import AddWatermark from './pages/AddWatermark';
import ProtectPdf from './pages/ProtectPdf';
import UnlockPdf from './pages/UnlockPdf';
import OcrPdf from './pages/OcrPdf';
import ComparePdfs from './pages/ComparePdfs';
import CropPdf from './pages/CropPdf';
import SignPdf from './pages/SignPdf';
import EditPdf from './pages/EditPdf';
import RedactPdf from './pages/RedactPdf';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

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
          <Route path="/word-to-pdf" element={<WordToPdf />} />
          <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
          <Route path="/add-watermark" element={<AddWatermark />} />
          <Route path="/protect-pdf" element={<ProtectPdf />} />
          <Route path="/unlock-pdf" element={<UnlockPdf />} />
          <Route path="/ocr-pdf" element={<OcrPdf />} />
          <Route path="/compare-pdfs" element={<ComparePdfs />} />
          <Route path="/crop-pdf" element={<CropPdf />} />
          <Route path="/sign-pdf" element={<SignPdf />} />
          <Route path="/edit-pdf" element={<EditPdf />} />
          <Route path="/redact-pdf" element={<RedactPdf />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
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