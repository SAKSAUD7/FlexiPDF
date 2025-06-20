import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import MobileNav from './components/MobileNav';
import ScrollToTop from './components/ScrollToTop';
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
import SplitPdf from './pages/SplitPdf';
import RotatePdf from './pages/RotatePdf';
import JpgToPdf from './pages/JpgToPdf';
import ExcelToPdf from './pages/ExcelToPdf';
import PowerPointToPdf from './pages/PowerPointToPdf';
import HtmlToPdf from './pages/HtmlToPdf';
import AddPageNumbers from './pages/AddPageNumbers';
import ExtractPages from './pages/ExtractPages';
import RemovePages from './pages/RemovePages';
import OrganizePdf from './pages/OrganizePdf';
import PdfToPdfA from './pages/PdfToPdfA';
import RepairPdf from './pages/RepairPdf';
import FlattenPdf from './pages/FlattenPdf';
import ScanToPdf from './pages/ScanToPdf';
import PdfReader from './pages/PdfReader';
import SharePdf from './pages/SharePdf';
import ChatWithPdf from './pages/ChatWithPdf';
import PdfSummarizer from './pages/PdfSummarizer';
import TranslatePdf from './pages/TranslatePdf';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-16">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/word-to-pdf" element={<WordToPdf />} />
          <Route path="/excel-to-pdf" element={<ExcelToPdf />} />
          <Route path="/powerpoint-to-pdf" element={<PowerPointToPdf />} />
          <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
          <Route path="/html-to-pdf" element={<HtmlToPdf />} />
          <Route path="/pdf-to-word" element={<PdfToWord />} />
          <Route path="/pdf-to-excel" element={<PdfToExcel />} />
          <Route path="/pdf-to-powerpoint" element={<PdfToPowerPoint />} />
          <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
          <Route path="/pdf-to-pdf-a" element={<PdfToPdfA />} />
          <Route path="/merge-pdf" element={<MergePdf />} />
          <Route path="/split-pdf" element={<SplitPdf />} />
          <Route path="/rotate-pdf" element={<RotatePdf />} />
          <Route path="/extract-pages" element={<ExtractPages />} />
          <Route path="/remove-pages" element={<RemovePages />} />
          <Route path="/organize-pdf" element={<OrganizePdf />} />
          <Route path="/edit-pdf" element={<EditPdf />} />
          <Route path="/add-watermark" element={<AddWatermark />} />
          <Route path="/add-page-numbers" element={<AddPageNumbers />} />
          <Route path="/crop-pdf" element={<CropPdf />} />
          <Route path="/redact-pdf" element={<RedactPdf />} />
          <Route path="/compress-pdf" element={<CompressPdf />} />
          <Route path="/repair-pdf" element={<RepairPdf />} />
          <Route path="/flatten-pdf" element={<FlattenPdf />} />
          <Route path="/ocr-pdf" element={<OcrPdf />} />
          <Route path="/protect-pdf" element={<ProtectPdf />} />
          <Route path="/unlock-pdf" element={<UnlockPdf />} />
          <Route path="/sign-pdf" element={<SignPdf />} />
          <Route path="/compare-pdfs" element={<ComparePdfs />} />
          <Route path="/scan-to-pdf" element={<ScanToPdf />} />
          <Route path="/pdf-reader" element={<PdfReader />} />
          <Route path="/share-pdf" element={<SharePdf />} />
          <Route path="/chat-with-pdf" element={<ChatWithPdf />} />
          <Route path="/pdf-summarizer" element={<PdfSummarizer />} />
          <Route path="/translate-pdf" element={<TranslatePdf />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>
      <Footer />
      <MobileNav />
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