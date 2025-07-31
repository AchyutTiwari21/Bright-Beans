import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Brush, Download, RotateCcw, Trash2, Home, Scissors, Heart, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArtAndCraftPage = () => {
  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');
  const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([]);

  // Coloring state
  const [coloringColors, setColoringColors] = useState<{ [key: string]: string }>({});
  const [selectedColor, setSelectedColor] = useState('#ff6b6b');

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
    '#ee5a24', '#0abde3', '#10ac84', '#f368e0', '#222f3e'
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

    // Save current state for undo
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setCanvasHistory(prev => [...prev.slice(-9), imageData]);

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
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

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
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

  // Coloring functions
  const handleColorArea = (areaId: string) => {
    setColoringColors(prev => ({
      ...prev,
      [areaId]: selectedColor
    }));
  };

  // Animation variants
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
            
            {/* Color Palette */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {colors.map((color) => (
                <motion.button
                  key={color}
                  className={`w-8 h-8 rounded-full border-4 ${
                    selectedColor === color ? 'border-gray-800' : 'border-gray-300'
                  }`}
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
              <svg
                width="300"
                height="300"
                viewBox="0 0 300 300"
                className="border-2 border-gray-300 rounded-lg bg-white"
              >
                {/* Simple Cat Drawing */}
                <circle
                  cx="150"
                  cy="120"
                  r="60"
                  fill={coloringColors['head'] || 'white'}
                  stroke="#333"
                  strokeWidth="3"
                  onClick={() => handleColorArea('head')}
                  className="cursor-pointer hover:stroke-purple-500"
                />
                <circle
                  cx="130"
                  cy="100"
                  r="8"
                  fill={coloringColors['leftEye'] || 'white'}
                  stroke="#333"
                  strokeWidth="2"
                  onClick={() => handleColorArea('leftEye')}
                  className="cursor-pointer hover:stroke-purple-500"
                />
                <circle
                  cx="170"
                  cy="100"
                  r="8"
                  fill={coloringColors['rightEye'] || 'white'}
                  stroke="#333"
                  strokeWidth="2"
                  onClick={() => handleColorArea('rightEye')}
                  className="cursor-pointer hover:stroke-purple-500"
                />
                <polygon
                  points="150,110 140,130 160,130"
                  fill={coloringColors['nose'] || 'white'}
                  stroke="#333"
                  strokeWidth="2"
                  onClick={() => handleColorArea('nose')}
                  className="cursor-pointer hover:stroke-purple-500"
                />
                <ellipse
                  cx="150"
                  cy="200"
                  rx="40"
                  ry="60"
                  fill={coloringColors['body'] || 'white'}
                  stroke="#333"
                  strokeWidth="3"
                  onClick={() => handleColorArea('body')}
                  className="cursor-pointer hover:stroke-purple-500"
                />
                {/* Cat ears */}
                <polygon
                  points="110,80 130,40 150,80"
                  fill={coloringColors['leftEar'] || 'white'}
                  stroke="#333"
                  strokeWidth="3"
                  onClick={() => handleColorArea('leftEar')}
                  className="cursor-pointer hover:stroke-purple-500"
                />
                <polygon
                  points="150,80 170,40 190,80"
                  fill={coloringColors['rightEar'] || 'white'}
                  stroke="#333"
                  strokeWidth="3"
                  onClick={() => handleColorArea('rightEar')}
                  className="cursor-pointer hover:stroke-purple-500"
                />
                {/* Tail */}
                <ellipse
                  cx="200"
                  cy="180"
                  rx="15"
                  ry="40"
                  fill={coloringColors['tail'] || 'white'}
                  stroke="#333"
                  strokeWidth="3"
                  onClick={() => handleColorArea('tail')}
                  className="cursor-pointer hover:stroke-purple-500"
                  transform="rotate(30 200 180)"
                />
              </svg>
            </div>
            
            <p className="text-center text-gray-600 mt-4">
              Click on different parts of the cat to color them!
            </p>
          </div>
        </motion.section>

        {/* Free Drawing Canvas Section */}
        <motion.section 
          className="mb-12"
          variants={sectionVariants}
        >
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-purple-700">
              ✏️ Free Drawing Canvas
            </h2>
            
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
