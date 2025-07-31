import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Palette, Brush, Download, RotateCcw, Trash2, Home, Scissors, Heart, Gift, Square, Circle, Triangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArtAndCraftPage = () => {
  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');
  const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([]);
  const [drawingMode, setDrawingMode] = useState<'brush' | 'circle' | 'square' | 'triangle'>('brush');
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

  // Coloring state
  const [coloringColors, setColoringColors] = useState<{ [key: string]: string }>({});
  const [selectedColor, setSelectedColor] = useState('#ff6b6b');
  const [currentPicture, setCurrentPicture] = useState(0);

  const colors = [
    '#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80',
    '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff', '#ff0080',
    '#000000', '#404040', '#808080', '#c0c0c0', '#ffffff', '#8b4513',
    '#ff69b4', '#ffc0cb', '#dda0dd', '#98fb98', '#87ceeb', '#f0e68c'
  ];

  const coloringPictures = [
    {
      name: "Cute Cat",
      svg: (
        <svg width="300" height="300" viewBox="0 0 300 300" className="border-2 border-gray-300 rounded-lg bg-white">
          {/* Improved Cat Drawing */}
          <ellipse cx="150" cy="140" rx="70" ry="60" fill={coloringColors['cat-head'] || 'white'} stroke="#333" strokeWidth="3" onClick={() => handleColorArea('cat-head')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Cat ears */}
          <polygon points="100,90 120,50 140,90" fill={coloringColors['cat-left-ear'] || 'white'} stroke="#333" strokeWidth="3" onClick={() => handleColorArea('cat-left-ear')} className="cursor-pointer hover:stroke-purple-500" />
          <polygon points="160,90 180,50 200,90" fill={coloringColors['cat-right-ear'] || 'white'} stroke="#333" strokeWidth="3" onClick={() => handleColorArea('cat-right-ear')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Eyes */}
          <ellipse cx="130" cy="125" rx="12" ry="15" fill={coloringColors['cat-left-eye'] || 'white'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('cat-left-eye')} className="cursor-pointer hover:stroke-purple-500" />
          <ellipse cx="170" cy="125" rx="12" ry="15" fill={coloringColors['cat-right-eye'] || 'white'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('cat-right-eye')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Eye pupils */}
          <ellipse cx="130" cy="125" rx="6" ry="10" fill="#000" />
          <ellipse cx="170" cy="125" rx="6" ry="10" fill="#000" />
          
          {/* Nose */}
          <polygon points="150,140 145,150 155,150" fill={coloringColors['cat-nose'] || '#ff69b4'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('cat-nose')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Body */}
          <ellipse cx="150" cy="220" rx="50" ry="70" fill={coloringColors['cat-body'] || 'white'} stroke="#333" strokeWidth="3" onClick={() => handleColorArea('cat-body')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Tail */}
          <ellipse cx="210" cy="200" rx="20" ry="50" fill={coloringColors['cat-tail'] || 'white'} stroke="#333" strokeWidth="3" onClick={() => handleColorArea('cat-tail')} className="cursor-pointer hover:stroke-purple-500" transform="rotate(20 210 200)" />
        </svg>
      )
    },
    {
      name: "Beautiful Scenery",
      svg: (
        <svg width="300" height="300" viewBox="0 0 300 300" className="border-2 border-gray-300 rounded-lg bg-white">
          {/* Sky */}
          <rect x="0" y="0" width="300" height="180" fill={coloringColors['sky'] || 'white'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('sky')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Sun */}
          <circle cx="250" cy="50" r="25" fill={coloringColors['sun'] || 'white'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('sun')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Mountains */}
          <polygon points="0,120 60,60 120,120" fill={coloringColors['mountain1'] || 'white'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('mountain1')} className="cursor-pointer hover:stroke-purple-500" />
          <polygon points="80,120 140,40 200,120" fill={coloringColors['mountain2'] || 'white'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('mountain2')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* House */}
          <rect x="120" y="150" width="60" height="50" fill={coloringColors['house-wall'] || 'white'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('house-wall')} className="cursor-pointer hover:stroke-purple-500" />
          <polygon points="110,150 150,120 190,150" fill={coloringColors['house-roof'] || 'white'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('house-roof')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* River */}
          <path d="M 0 200 Q 75 190 150 200 Q 225 210 300 200 L 300 220 Q 225 230 150 220 Q 75 210 0 220 Z" fill={coloringColors['river'] || 'white'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('river')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Ground */}
          <rect x="0" y="220" width="300" height="80" fill={coloringColors['ground'] || 'white'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('ground')} className="cursor-pointer hover:stroke-purple-500" />
        </svg>
      )
    },
    {
      name: "Fruit Basket",
      svg: (
        <svg width="300" height="300" viewBox="0 0 300 300" className="border-2 border-gray-300 rounded-lg bg-white">
          {/* Basket */}
          <ellipse cx="150" cy="220" rx="80" ry="25" fill={coloringColors['basket-bottom'] || 'white'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('basket-bottom')} className="cursor-pointer hover:stroke-purple-500" />
          <path d="M 70 220 Q 70 180 80 160 L 220 160 Q 230 180 230 220" fill={coloringColors['basket-body'] || 'white'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('basket-body')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Apple */}
          <circle cx="130" cy="140" r="20" fill={coloringColors['apple'] || 'white'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('apple')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Orange */}
          <circle cx="170" cy="135" r="18" fill={coloringColors['orange'] || 'white'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('orange')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Banana */}
          <path d="M 110 120 Q 95 110 85 125 Q 90 140 105 135 Q 115 130 110 120" fill={coloringColors['banana'] || 'white'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('banana')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Grapes */}
          <g fill={coloringColors['grapes'] || 'white'} stroke="#333" strokeWidth="1">
            <circle cx="200" cy="120" r="6" onClick={() => handleColorArea('grapes')} className="cursor-pointer hover:stroke-purple-500" />
            <circle cx="190" cy="130" r="6" onClick={() => handleColorArea('grapes')} className="cursor-pointer hover:stroke-purple-500" />
            <circle cx="210" cy="130" r="6" onClick={() => handleColorArea('grapes')} className="cursor-pointer hover:stroke-purple-500" />
          </g>
        </svg>
      )
    }
  ];

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setCanvasHistory(prev => [...prev.slice(-9), imageData]);

    setStartPos({ x, y });
    setIsDrawing(true);

    if (drawingMode === 'brush') {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (drawingMode === 'brush') {
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.strokeStyle = brushColor;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (drawingMode !== 'brush') {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;

      const width = x - startPos.x;
      const height = y - startPos.y;

      switch (drawingMode) {
        case 'circle':
          const radius = Math.sqrt(width * width + height * height);
          ctx.beginPath();
          ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
          ctx.stroke();
          break;
        case 'square':
          ctx.strokeRect(startPos.x, startPos.y, width, height);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(startPos.x, startPos.y);
          ctx.lineTo(x, y);
          ctx.lineTo(startPos.x - width, y);
          ctx.closePath();
          ctx.stroke();
          break;
      }
    }

    setIsDrawing(false);
    setStartPos(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasHistory([]);
  };

  const undoCanvas = () => {
    if (canvasHistory.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const lastState = canvasHistory[canvasHistory.length - 1];
    ctx.putImageData(lastState, 0, 0);
    setCanvasHistory(prev => prev.slice(0, -1));
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'my-artwork.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleColorArea = (areaId: string) => {
    setColoringColors(prev => ({
      ...prev,
      [areaId]: selectedColor
    }));
  };

  const nextPicture = () => {
    setCurrentPicture((prev) => (prev + 1) % coloringPictures.length);
    setColoringColors({});
  };

  const prevPicture = () => {
    setCurrentPicture((prev) => (prev - 1 + coloringPictures.length) % coloringPictures.length);
    setColoringColors({});
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 p-4">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          variants={sectionVariants}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-4 transition-colors"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 mb-4">
            🎨 Art & Craft Fun!
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            Draw, Color, and Create with Joy!
          </p>
        </motion.div>

        {/* Color a Picture Section */}
        <motion.section 
          className="mb-12"
          variants={sectionVariants}
        >
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-purple-700">
              🖍️ Color a Picture
            </h2>
            
            {/* Picture Navigation */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.button
                onClick={prevPicture}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <ChevronLeft size={16} />
                Previous
              </motion.button>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold text-purple-700">
                  {coloringPictures[currentPicture].name}
                </h3>
                <p className="text-sm text-gray-600">
                  {currentPicture + 1} of {coloringPictures.length}
                </p>
              </div>
              
              <motion.button
                onClick={nextPicture}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Next
                <ChevronRight size={16} />
              </motion.button>
            </div>
            
            {/* Enhanced Color Palette */}
            <div className="grid grid-cols-6 md:grid-cols-12 gap-2 justify-center mb-6 max-w-2xl mx-auto">
              {colors.map((color) => (
                <motion.button
                  key={color}
                  className={`w-8 h-8 rounded-full border-4 ${
                    selectedColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                  } transition-all duration-200`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                />
              ))}
            </div>

            {/* SVG Coloring Area */}
            <div className="flex justify-center">
              {coloringPictures[currentPicture].svg}
            </div>
            
            <p className="text-center text-gray-600 mt-4">
              Click on different parts of the picture to color them!
            </p>
          </div>
        </motion.section>

        {/* Enhanced Free Drawing Canvas Section */}
        <motion.section 
          className="mb-12"
          variants={sectionVariants}
        >
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-purple-700">
              ✏️ Free Drawing Canvas
            </h2>
            
            {/* Drawing Mode Selection */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <motion.button
                onClick={() => setDrawingMode('brush')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  drawingMode === 'brush' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Brush size={16} />
                Brush
              </motion.button>
              
              <motion.button
                onClick={() => setDrawingMode('circle')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  drawingMode === 'circle' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Circle size={16} />
                Circle
              </motion.button>
              
              <motion.button
                onClick={() => setDrawingMode('square')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  drawingMode === 'square' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Square size={16} />
                Rectangle
              </motion.button>
              
              <motion.button
                onClick={() => setDrawingMode('triangle')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  drawingMode === 'triangle' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Triangle size={16} />
                Triangle
              </motion.button>
            </div>
            
            {/* Drawing Controls */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Brush size={20} className="text-purple-600" />
                <label className="text-sm font-medium">Size:</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm">{brushSize}px</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Palette size={20} className="text-purple-600" />
                <label className="text-sm font-medium">Color:</label>
                <input
                  type="color"
                  value={brushColor}
                  onChange={(e) => setBrushColor(e.target.value)}
                  className="w-12 h-8 rounded border"
                />
              </div>
            </div>

            {/* Enhanced Color Palette for Canvas */}
            <div className="grid grid-cols-6 md:grid-cols-12 gap-2 justify-center mb-6 max-w-2xl mx-auto">
              {colors.map((color) => (
                <motion.button
                  key={color}
                  className={`w-6 h-6 rounded border-2 ${
                    brushColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                  } transition-all duration-200`}
                  style={{ backgroundColor: color }}
                  onClick={() => setBrushColor(color)}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                />
              ))}
            </div>

            {/* Canvas */}
            <div className="flex justify-center mb-4">
              <canvas
                ref={canvasRef}
                width={400}
                height={300}
                className="border-2 border-gray-300 rounded-lg bg-white cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </div>

            {/* Canvas Controls */}
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                onClick={undoCanvas}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={canvasHistory.length === 0}
              >
                <RotateCcw size={16} />
                Undo
              </motion.button>
              
              <motion.button
                onClick={clearCanvas}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Trash2 size={16} />
                Clear
              </motion.button>
              
              <motion.button
                onClick={downloadCanvas}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Download size={16} />
                Download
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* More Activities Section */}
        <motion.section variants={sectionVariants}>
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-purple-700">
              🌟 More Fun Activities
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="bg-gradient-to-br from-pink-100 to-rose-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Scissors size={48} className="mx-auto mb-4 text-pink-600" />
                <h3 className="text-xl font-bold text-pink-800 mb-2">Paper Folding</h3>
                <p className="text-pink-700">Learn origami and paper crafts</p>
                <div className="mt-4 text-sm text-pink-600 font-medium">Coming Soon!</div>
              </motion.div>
              
              <motion.div
                className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Heart size={48} className="mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-bold text-blue-800 mb-2">Handprint Art</h3>
                <p className="text-blue-700">Create art with your handprints</p>
                <div className="mt-4 text-sm text-blue-600 font-medium">Coming Soon!</div>
              </motion.div>
              
              <motion.div
                className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Gift size={48} className="mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-bold text-green-800 mb-2">Make Your Card</h3>
                <p className="text-green-700">Design greeting cards</p>
                <div className="mt-4 text-sm text-green-600 font-medium">Coming Soon!</div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default ArtAndCraftPage;
