import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as fabric from 'fabric';
import toast from 'react-hot-toast';
import {
  DocumentArrowUpIcon,
  PencilIcon,
  PaintBrushIcon,
  CursorArrowRippleIcon,
  PhotoIcon,
  RectangleStackIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeDropperIcon,
  SparklesIcon,
  DocumentTextIcon,
  TrashIcon,
  Squares2X2Icon,
  PlusIcon,
  MinusIcon,
  ArrowsPointingOutIcon,
  BookmarkIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const tools = {
  SELECT: 'select',
  TEXT: 'text',
  DRAW: 'draw',
  SHAPE: 'shape',
  IMAGE: 'image',
  HIGHLIGHT: 'highlight',
  SIGNATURE: 'signature',
  STICKY_NOTE: 'sticky_note',
  STAMP: 'stamp',
  STRIKETHROUGH: 'strikethrough',
  UNDERLINE: 'underline',
};

const shapeTypes = {
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
  LINE: 'line',
  ARROW: 'arrow',
};

const predefinedTexts = [
  'APPROVED', 'REJECTED', 'DRAFT', 'CONFIDENTIAL', 'URGENT', 'REVIEWED'
];

export default function EditPdf() {
  // State management
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [activeTool, setActiveTool] = useState(tools.SELECT);
  const [activeShape, setActiveShape] = useState(shapeTypes.RECTANGLE);
  const [brushSize, setBrushSize] = useState(3);
  const [brushColor, setBrushColor] = useState('#ff0000');
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [isDrawing, setIsDrawing] = useState(false);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [isEditingText, setIsEditingText] = useState(false);

  // Refs
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const colorPickerRef = useRef(null);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (canvasRef.current && !fabricCanvas) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 1000,
        backgroundColor: '#f8fafc',
        selection: true,
        preserveObjectStacking: true,
      });
      
      setFabricCanvas(canvas);
      fabricCanvasRef.current = canvas;

      // Enhanced canvas events
      canvas.on('selection:created', (e) => {
        if (e.selected[0] && e.selected[0].type === 'i-text') {
          setIsEditingText(true);
          setSelectedText(e.selected[0].text);
        }
      });

      canvas.on('selection:cleared', () => {
        setIsEditingText(false);
        setSelectedText('');
      });

      // Save initial state
      saveToHistory(canvas);

      return () => {
        canvas.dispose();
      };
    }
  }, []);

  // File upload handling with enhanced error handling
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      setIsLoading(true);
      try {
        setPdfFile(file);
        await loadPdf(file);
        toast.success('PDF loaded successfully! Start editing now.');
      } catch (error) {
        console.error('Error loading PDF:', error);
        toast.error('Failed to load PDF file. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('Please upload a valid PDF file');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  // Enhanced PDF loading
  const loadPdf = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    setPdfDoc(pdf);
    setTotalPages(pdf.numPages);
    setCurrentPage(1);
    await renderPage(pdf, 1);
  };

  // Enhanced page rendering
  const renderPage = async (pdf, pageNum) => {
    if (!fabricCanvas) return;

    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: zoom });
    
    const tempCanvas = document.createElement('canvas');
    const tempContext = tempCanvas.getContext('2d');
    tempCanvas.width = viewport.width;
    tempCanvas.height = viewport.height;

    await page.render({
      canvasContext: tempContext,
      viewport: viewport
    }).promise;

    const dataURL = tempCanvas.toDataURL();
    fabric.Image.fromURL(dataURL, (img) => {
      fabricCanvas.setBackgroundImage(img, fabricCanvas.renderAll.bind(fabricCanvas), {
        scaleX: fabricCanvas.width / img.width,
        scaleY: fabricCanvas.height / img.height
      });
      
      fabricCanvas.setDimensions({
        width: Math.min(viewport.width, 800),
        height: Math.min(viewport.height, 1000)
      });
    });
  };

  // Enhanced history management
  const saveToHistory = (canvas) => {
    const state = JSON.stringify(canvas.toJSON(['selectable', 'evented']));
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(state);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      fabricCanvas.loadFromJSON(history[prevIndex], fabricCanvas.renderAll.bind(fabricCanvas));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      fabricCanvas.loadFromJSON(history[nextIndex], fabricCanvas.renderAll.bind(fabricCanvas));
    }
  };

  // Enhanced tool handlers
  const handleToolChange = (tool) => {
    setActiveTool(tool);
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = false;
    fabricCanvas.selection = true;
    fabricCanvas.defaultCursor = 'default';

    switch (tool) {
      case tools.SELECT:
        fabricCanvas.defaultCursor = 'default';
        break;
      case tools.DRAW:
        fabricCanvas.isDrawingMode = true;
        fabricCanvas.freeDrawingBrush.width = brushSize;
        fabricCanvas.freeDrawingBrush.color = brushColor;
        fabricCanvas.freeDrawingBrush.shadowBlur = 0;
        break;
      case tools.TEXT:
        fabricCanvas.defaultCursor = 'text';
        break;
      case tools.SHAPE:
        fabricCanvas.defaultCursor = 'crosshair';
        break;
      case tools.HIGHLIGHT:
        fabricCanvas.defaultCursor = 'crosshair';
        break;
      case tools.STICKY_NOTE:
        fabricCanvas.defaultCursor = 'crosshair';
        break;
    }
  };

  // Enhanced canvas event handlers
  useEffect(() => {
    if (!fabricCanvas) return;

    const handleMouseDown = (options) => {
      const pointer = fabricCanvas.getPointer(options.e);
      
      switch (activeTool) {
        case tools.TEXT:
          addText(pointer.x, pointer.y);
          break;
        case tools.SHAPE:
          startDrawingShape(pointer.x, pointer.y);
          break;
        case tools.HIGHLIGHT:
          addHighlight(pointer.x, pointer.y);
          break;
        case tools.STICKY_NOTE:
          addStickyNote(pointer.x, pointer.y);
          break;
        case tools.STAMP:
          addStamp(pointer.x, pointer.y);
          break;
      }
    };

    const handleObjectModified = () => {
      saveToHistory(fabricCanvas);
    };

    fabricCanvas.on('mouse:down', handleMouseDown);
    fabricCanvas.on('object:modified', handleObjectModified);
    fabricCanvas.on('path:created', handleObjectModified);

    return () => {
      fabricCanvas.off('mouse:down', handleMouseDown);
      fabricCanvas.off('object:modified', handleObjectModified);
      fabricCanvas.off('path:created', handleObjectModified);
    };
  }, [fabricCanvas, activeTool, activeShape, fontSize, textColor, brushColor, fontFamily]);

  // Enhanced text adding
  const addText = (x, y) => {
    const text = new fabric.IText('Click to edit text', {
      left: x,
      top: y,
      fontSize: fontSize,
      fill: textColor,
      fontFamily: fontFamily,
      fontWeight: 'normal',
      editable: true,
      selectable: true,
    });
    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    text.enterEditing();
    saveToHistory(fabricCanvas);
  };

  // Enhanced shape adding
  const startDrawingShape = (x, y) => {
    let shape;
    
    switch (activeShape) {
      case shapeTypes.RECTANGLE:
        shape = new fabric.Rect({
          left: x,
          top: y,
          width: 100,
          height: 60,
          fill: 'transparent',
          stroke: brushColor,
          strokeWidth: 2,
          rx: 5,
          ry: 5,
        });
        break;
      case shapeTypes.CIRCLE:
        shape = new fabric.Circle({
          left: x,
          top: y,
          radius: 50,
          fill: 'transparent',
          stroke: brushColor,
          strokeWidth: 2,
        });
        break;
      case shapeTypes.LINE:
        shape = new fabric.Line([x, y, x + 100, y], {
          stroke: brushColor,
          strokeWidth: 2,
          strokeLineCap: 'round',
        });
        break;
      case shapeTypes.ARROW:
        const arrowPath = `M ${x} ${y} L ${x + 80} ${y} M ${x + 70} ${y - 10} L ${x + 80} ${y} L ${x + 70} ${y + 10}`;
        shape = new fabric.Path(arrowPath, {
          fill: '',
          stroke: brushColor,
          strokeWidth: 2,
          strokeLineCap: 'round',
        });
        break;
    }
    
    if (shape) {
      fabricCanvas.add(shape);
      saveToHistory(fabricCanvas);
    }
  };

  // Enhanced highlight
  const addHighlight = (x, y) => {
    const highlight = new fabric.Rect({
      left: x,
      top: y,
      width: 120,
      height: 20,
      fill: 'rgba(255, 255, 0, 0.4)',
      stroke: 'rgba(255, 255, 0, 0.8)',
      strokeWidth: 1,
      selectable: true,
    });
    fabricCanvas.add(highlight);
    saveToHistory(fabricCanvas);
  };

  // Add sticky note
  const addStickyNote = (x, y) => {
    const group = new fabric.Group([
      new fabric.Rect({
        width: 80,
        height: 80,
        fill: '#ffeb3b',
        stroke: '#fbc02d',
        strokeWidth: 1,
        rx: 5,
        ry: 5,
      }),
      new fabric.IText('Note', {
        fontSize: 12,
        fill: '#333',
        fontFamily: 'Arial',
        width: 70,
        textAlign: 'center',
        top: 30,
        left: 40,
        originX: 'center',
        originY: 'center',
      })
    ], {
      left: x,
      top: y,
      selectable: true,
    });
    
    fabricCanvas.add(group);
    saveToHistory(fabricCanvas);
  };

  // Add stamp
  const addStamp = (x, y) => {
    const stampText = predefinedTexts[Math.floor(Math.random() * predefinedTexts.length)];
    const stamp = new fabric.Text(stampText, {
      left: x,
      top: y,
      fontSize: 16,
      fill: '#d32f2f',
      fontFamily: 'Arial',
      fontWeight: 'bold',
      stroke: '#d32f2f',
      strokeWidth: 1,
      textAlign: 'center',
      selectable: true,
    });
    fabricCanvas.add(stamp);
    saveToHistory(fabricCanvas);
  };

  // Enhanced image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        fabric.Image.fromURL(e.target.result, (img) => {
          const maxWidth = 200;
          const maxHeight = 200;
          
          if (img.width > maxWidth || img.height > maxHeight) {
            const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
            img.scale(scale);
          }
          
          img.set({
            left: 100,
            top: 100,
            selectable: true,
          });
          fabricCanvas.add(img);
          saveToHistory(fabricCanvas);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Enhanced zoom controls
  const zoomIn = () => {
    const newZoom = Math.min(zoom * 1.25, 3);
    setZoom(newZoom);
    if (pdfDoc) {
      renderPage(pdfDoc, currentPage);
    }
  };

  const zoomOut = () => {
    const newZoom = Math.max(zoom / 1.25, 0.25);
    setZoom(newZoom);
    if (pdfDoc) {
      renderPage(pdfDoc, currentPage);
    }
  };

  // Enhanced page navigation
  const goToPrevPage = async () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      await renderPage(pdfDoc, newPage);
      fabricCanvas.clear();
    }
  };

  const goToNextPage = async () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      await renderPage(pdfDoc, newPage);
      fabricCanvas.clear();
    }
  };

  // Enhanced delete function
  const deleteSelected = () => {
    const activeObjects = fabricCanvas.getActiveObjects();
    if (activeObjects.length > 0) {
      activeObjects.forEach(obj => fabricCanvas.remove(obj));
      fabricCanvas.discardActiveObject();
      saveToHistory(fabricCanvas);
    }
  };

  // Clear all annotations
  const clearAll = () => {
    const objects = fabricCanvas.getObjects().filter(obj => obj !== fabricCanvas.backgroundImage);
    objects.forEach(obj => fabricCanvas.remove(obj));
    saveToHistory(fabricCanvas);
  };

  // Enhanced download
  const downloadPdf = async () => {
    if (!pdfFile) {
      toast.error('No PDF file loaded');
      return;
    }

    try {
      setIsLoading(true);
      toast.loading('Preparing your edited PDF...');
      
      const canvasDataURL = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 2
      });

      const existingPdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      
      const pages = pdfDoc.getPages();
      const page = pages[currentPage - 1];
      
      const pngImage = await pdfDoc.embedPng(canvasDataURL);
      const { width, height } = page.getSize();
      
      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });

      const pdfBytes = await pdfDoc.save();
      
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `edited-${pdfFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.dismiss();
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error saving PDF:', error);
      toast.dismiss();
      toast.error('Failed to save PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case 'y':
            e.preventDefault();
            redo();
            break;
          case 's':
            e.preventDefault();
            downloadPdf();
            break;
        }
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteSelected();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  const toolbarItems = [
    { tool: tools.SELECT, icon: CursorArrowRippleIcon, label: 'Select', color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { tool: tools.TEXT, icon: DocumentTextIcon, label: 'Text', color: 'bg-green-50 text-green-600 border-green-200' },
    { tool: tools.DRAW, icon: PaintBrushIcon, label: 'Draw', color: 'bg-red-50 text-red-600 border-red-200' },
    { tool: tools.SHAPE, icon: Squares2X2Icon, label: 'Shapes', color: 'bg-purple-50 text-purple-600 border-purple-200' },
    { tool: tools.HIGHLIGHT, icon: EyeDropperIcon, label: 'Highlight', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
    { tool: tools.STICKY_NOTE, icon: ChatBubbleBottomCenterTextIcon, label: 'Note', color: 'bg-orange-50 text-orange-600 border-orange-200' },
    { tool: tools.STAMP, icon: BookmarkIcon, label: 'Stamp', color: 'bg-pink-50 text-pink-600 border-pink-200' },
    { tool: tools.IMAGE, icon: PhotoIcon, label: 'Image', color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
  ];

  const colorPalette = [
    '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
    '#800000', '#008000', '#000080', '#808000', '#800080', '#008080', '#808080'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PDF Editor
            </span>
          </h1>
          <p className="text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Professional PDF editing with advanced annotation tools. Edit text, add shapes, images, and signatures to your documents.
          </p>
        </div>

        {!pdfFile ? (
          // Enhanced upload area
          <div className="mx-auto max-w-3xl">
            <div
              {...getRootProps()}
              className={`relative border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all duration-300 ${
                isDragActive 
                  ? 'border-blue-400 bg-blue-50 scale-105' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="space-y-6">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <DocumentArrowUpIcon className="h-10 w-10 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-2">
                    {isDragActive ? 'Drop your PDF here' : 'Upload PDF to Edit'}
                  </p>
                  <p className="text-gray-500 text-lg">
                    Drag and drop a PDF file, or click to browse
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span>No file storage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span>Free to use</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Enhanced editor interface
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Top toolbar */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Tools */}
                <div className="flex flex-wrap gap-2">
                  {toolbarItems.map(({ tool, icon: Icon, label, color }) => (
                    <button
                      key={tool}
                      onClick={() => {
                        if (tool === tools.IMAGE) {
                          fileInputRef.current?.click();
                        } else {
                          handleToolChange(tool);
                        }
                      }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl border-2 transition-all duration-200 ${
                        activeTool === tool
                          ? color
                          : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium hidden sm:block">{label}</span>
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={undo}
                    disabled={historyIndex <= 0}
                    className="p-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowUturnLeftIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={redo}
                    disabled={historyIndex >= history.length - 1}
                    className="p-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowUturnRightIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={clearAll}
                    className="p-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={downloadPdf}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4" />
                    <span className="hidden sm:block">{isLoading ? 'Saving...' : 'Download'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex">
              {/* Side panel */}
              <div className="w-80 bg-gray-50 border-r border-gray-200 p-6 space-y-6">
                {/* Page navigation */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Page Navigation</h3>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage <= 1}
                      className="p-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-medium text-gray-700">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage >= totalPages}
                      className="p-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Zoom controls */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Zoom</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={zoomOut}
                      className="p-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={zoomIn}
                      className="p-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Tool-specific controls */}
                {(activeTool === tools.DRAW || activeTool === tools.SHAPE) && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Brush Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Size: {brushSize}px</label>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          value={brushSize}
                          onChange={(e) => setBrushSize(parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Color</label>
                        <div className="grid grid-cols-7 gap-1">
                          {colorPalette.map(color => (
                            <button
                              key={color}
                              onClick={() => setBrushColor(color)}
                              className={`w-8 h-8 rounded border-2 ${brushColor === color ? 'border-gray-400' : 'border-gray-200'}`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTool === tools.TEXT && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Text Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Font Size: {fontSize}px</label>
                        <input
                          type="range"
                          min="8"
                          max="72"
                          value={fontSize}
                          onChange={(e) => setFontSize(parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Font Family</label>
                        <select
                          value={fontFamily}
                          onChange={(e) => setFontFamily(e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                        >
                          <option value="Arial">Arial</option>
                          <option value="Times New Roman">Times New Roman</option>
                          <option value="Helvetica">Helvetica</option>
                          <option value="Courier New">Courier New</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Color</label>
                        <div className="grid grid-cols-7 gap-1">
                          {colorPalette.map(color => (
                            <button
                              key={color}
                              onClick={() => setTextColor(color)}
                              className={`w-8 h-8 rounded border-2 ${textColor === color ? 'border-gray-400' : 'border-gray-200'}`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTool === tools.SHAPE && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Shape Type</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(shapeTypes).map(([key, shape]) => (
                        <button
                          key={shape}
                          onClick={() => setActiveShape(shape)}
                          className={`p-2 rounded-lg border text-xs font-medium ${
                            activeShape === shape
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          {key}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Canvas area */}
              <div className="flex-1 p-6">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="overflow-auto max-h-[800px] flex justify-center p-6">
                    <canvas
                      ref={canvasRef}
                      className="border border-gray-300 shadow-lg rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 flex items-center gap-4 shadow-2xl">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="font-medium text-lg">Processing your PDF...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 