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
          {/* Cat Head - Main oval */}
          <ellipse cx="150" cy="130" rx="65" ry="55" fill={coloringColors['cat-head'] || '#f8f8f8'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('cat-head')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Cat ears - triangular with inner ears */}
          <polygon points="105,85 125,45 145,85" fill={coloringColors['cat-left-ear'] || '#f8f8f8'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('cat-left-ear')} className="cursor-pointer hover:stroke-purple-500" />
          <polygon points="155,85 175,45 195,85" fill={coloringColors['cat-right-ear'] || '#f8f8f8'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('cat-right-ear')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Inner ears */}
          <polygon points="115,75 125,55 135,75" fill={coloringColors['cat-left-inner-ear'] || '#ffb6c1'} stroke="#333" strokeWidth="1" onClick={() => handleColorArea('cat-left-inner-ear')} className="cursor-pointer hover:stroke-purple-500" />
          <polygon points="165,75 175,55 185,75" fill={coloringColors['cat-right-inner-ear'] || '#ffb6c1'} stroke="#333" strokeWidth="1" onClick={() => handleColorArea('cat-right-inner-ear')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Eyes - larger and more expressive */}
          <ellipse cx="125" cy="120" rx="15" ry="18" fill={coloringColors['cat-left-eye'] || '#ffffff'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('cat-left-eye')} className="cursor-pointer hover:stroke-purple-500" />
          <ellipse cx="175" cy="120" rx="15" ry="18" fill={coloringColors['cat-right-eye'] || '#ffffff'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('cat-right-eye')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Eye pupils - cat-like */}
          <ellipse cx="125" cy="120" rx="4" ry="12" fill="#000" />
          <ellipse cx="175" cy="120" rx="4" ry="12" fill="#000" />
          
          {/* Eye shine */}
          <ellipse cx="127" cy="115" rx="2" ry="3" fill="#ffffff" />
          <ellipse cx="177" cy="115" rx="2" ry="3" fill="#ffffff" />
          
          {/* Nose - heart shaped */}
          <path d="M 150 140 C 145 135, 140 135, 145 145 C 150 150, 155 145, 160 135 C 165 135, 160 135, 150 140 Z" fill={coloringColors['cat-nose'] || '#ff69b4'} stroke="#333" strokeWidth="1.5" onClick={() => handleColorArea('cat-nose')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Mouth */}
          <path d="M 150 145 Q 140 155 130 150" stroke="#333" strokeWidth="2" fill="none" />
          <path d="M 150 145 Q 160 155 170 150" stroke="#333" strokeWidth="2" fill="none" />
          
          {/* Whiskers */}
          <line x1="90" y1="125" x2="115" y2="130" stroke="#333" strokeWidth="2" />
          <line x1="90" y1="135" x2="115" y2="135" stroke="#333" strokeWidth="2" />
          <line x1="90" y1="145" x2="115" y2="140" stroke="#333" strokeWidth="2" />
          <line x1="185" y1="130" x2="210" y2="125" stroke="#333" strokeWidth="2" />
          <line x1="185" y1="135" x2="210" y2="135" stroke="#333" strokeWidth="2" />
          <line x1="185" y1="140" x2="210" y2="145" stroke="#333" strokeWidth="2" />
          
          {/* Body - more proportional */}
          <ellipse cx="150" cy="220" rx="45" ry="65" fill={coloringColors['cat-body'] || '#f8f8f8'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('cat-body')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Front paws */}
          <ellipse cx="125" cy="270" rx="12" ry="20" fill={coloringColors['cat-left-paw'] || '#f8f8f8'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('cat-left-paw')} className="cursor-pointer hover:stroke-purple-500" />
          <ellipse cx="175" cy="270" rx="12" ry="20" fill={coloringColors['cat-right-paw'] || '#f8f8f8'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('cat-right-paw')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Tail - curved and fluffy */}
          <path d="M 195 200 Q 230 180 240 140 Q 245 120 235 100" stroke="#333" strokeWidth="2" fill="none" />
          <ellipse cx="220" cy="170" rx="8" ry="25" fill={coloringColors['cat-tail'] || '#f8f8f8'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('cat-tail')} className="cursor-pointer hover:stroke-purple-500" transform="rotate(25 220 170)" />
          <ellipse cx="235" cy="130" rx="8" ry="20" fill={coloringColors['cat-tail-tip'] || '#f8f8f8'} stroke="#333" strokeWidth="2" onClick={() => handleColorArea('cat-tail-tip')} className="cursor-pointer hover:stroke-purple-500" transform="rotate(45 235 130)" />
          
          {/* Chest marking */}
          <ellipse cx="150" cy="200" rx="15" ry="25" fill={coloringColors['cat-chest'] || '#ffffff'} stroke="#333" strokeWidth="1" onClick={() => handleColorArea('cat-chest')} className="cursor-pointer hover:stroke-purple-500" />
        </svg>
      )
    },
    {
      name: "Beautiful Scenery",
      svg: (
        <svg width="300" height="300" viewBox="0 0 300 300" className="border-2 border-gray-300 rounded-lg bg-white">
          {/* Sky gradient background */}
          <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={coloringColors['sky-top'] || '#87ceeb'} />
              <stop offset="100%" stopColor={coloringColors['sky-bottom'] || '#e0f6ff'} />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="300" height="160" fill="url(#skyGradient)" onClick={() => handleColorArea('sky-top')} className="cursor-pointer hover:stroke-purple-500" stroke="#333" strokeWidth="1" />
          
          {/* Sun with glow effect */}
          <circle cx="60" cy="40" r="28" fill="#fff4e6" opacity="0.6" />
          <circle cx="60" cy="40" r="22" fill={coloringColors['sun'] || '#ffd700'} stroke="#ffb347" strokeWidth="2" onClick={() => handleColorArea('sun')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Sun rays - more elegant */}
          <g stroke="#ffb347" strokeWidth="2" opacity="0.8">
            <line x1="60" y1="8" x2="60" y2="18" />
            <line x1="88" y1="18" x2="85" y2="25" />
            <line x1="102" y1="40" x2="92" y2="40" />
            <line x1="88" y1="62" x2="85" y2="55" />
            <line x1="60" y1="72" x2="60" y2="62" />
            <line x1="32" y1="62" x2="35" y2="55" />
            <line x1="18" y1="40" x2="28" y2="40" />
            <line x1="32" y1="18" x2="35" y2="25" />
          </g>
          
          {/* Fluffy clouds - more realistic */}
          <g fill={coloringColors['cloud1'] || '#ffffff'} stroke="#e6e6e6" strokeWidth="1" onClick={() => handleColorArea('cloud1')} className="cursor-pointer hover:stroke-purple-500">
            <circle cx="150" cy="30" r="12" />
            <circle cx="165" cy="25" r="15" />
            <circle cx="180" cy="30" r="12" />
            <circle cx="195" cy="35" r="10" />
            <circle cx="170" cy="40" r="14" />
            <circle cx="185" cy="45" r="8" />
          </g>
          
          <g fill={coloringColors['cloud2'] || '#ffffff'} stroke="#e6e6e6" strokeWidth="1" onClick={() => handleColorArea('cloud2')} className="cursor-pointer hover:stroke-purple-500">
            <circle cx="220" cy="50" r="10" />
            <circle cx="235" cy="45" r="12" />
            <circle cx="250" cy="50" r="10" />
            <circle cx="240" cy="60" r="8" />
          </g>
          
          {/* Distant mountains with better layering */}
          <polygon points="0,100 40,50 80,70 120,45 160,65 200,40 240,60 280,35 300,50 300,100" fill={coloringColors['far-mountains'] || '#b8c6db'} stroke="#9bb5d1" strokeWidth="1" onClick={() => handleColorArea('far-mountains')} className="cursor-pointer hover:stroke-purple-500" opacity="0.7" />
          
          {/* Middle mountains */}
          <polygon points="0,120 50,80 100,90 150,70 200,85 250,65 300,80 300,120" fill={coloringColors['middle-mountains'] || '#8fbc8f'} stroke="#7aa87a" strokeWidth="1.5" onClick={() => handleColorArea('middle-mountains')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Close mountains with snow caps */}
          <polygon points="40,120 90,60 140,120" fill={coloringColors['close-mountain1'] || '#6b8e23'} stroke="#5a7a1f" strokeWidth="2" onClick={() => handleColorArea('close-mountain1')} className="cursor-pointer hover:stroke-purple-500" />
          <polygon points="120,120 170,50 220,120" fill={coloringColors['close-mountain2'] || '#556b2f'} stroke="#4a5f29" strokeWidth="2" onClick={() => handleColorArea('close-mountain2')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Snow caps */}
          <polygon points="160,60 170,50 180,60" fill={coloringColors['snow-cap1'] || '#ffffff'} stroke="#e6e6e6" strokeWidth="1" onClick={() => handleColorArea('snow-cap1')} className="cursor-pointer hover:stroke-purple-500" />
          <polygon points="80,70 90,60 100,70" fill={coloringColors['snow-cap2'] || '#ffffff'} stroke="#e6e6e6" strokeWidth="1" onClick={() => handleColorArea('snow-cap2')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Rolling hills foreground */}
          <path d="M 0 120 Q 50 110 100 120 Q 150 130 200 120 Q 250 110 300 120 L 300 160 L 0 160 Z" fill={coloringColors['hills'] || '#90ee90'} stroke="#7dd87d" strokeWidth="1" onClick={() => handleColorArea('hills')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Ground/Grass area */}
          <rect x="0" y="160" width="300" height="140" fill={coloringColors['grass'] || '#32cd32'} stroke="#2eb82e" strokeWidth="1" onClick={() => handleColorArea('grass')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Winding path */}
          <path d="M 0 200 Q 50 190 100 200 Q 150 210 200 200 Q 250 190 300 200 L 300 210 Q 250 200 200 210 Q 150 220 100 210 Q 50 200 0 210 Z" fill={coloringColors['path'] || '#deb887'} stroke="#cd853f" strokeWidth="1" onClick={() => handleColorArea('path')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Beautiful large tree */}
          <ellipse cx="50" cy="180" rx="8" ry="25" fill={coloringColors['tree-trunk'] || '#8b4513'} stroke="#654321" strokeWidth="2" onClick={() => handleColorArea('tree-trunk')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Tree branches */}
          <g stroke="#654321" strokeWidth="3" fill="none">
            <path d="M 50 165 Q 45 155 40 150" />
            <path d="M 50 170 Q 55 160 65 155" />
            <path d="M 50 175 Q 40 165 35 160" />
          </g>
          
          {/* Tree foliage - multiple layers */}
          <circle cx="45" cy="145" r="18" fill={coloringColors['tree-leaves1'] || '#228b22'} stroke="#1f7a1f" strokeWidth="1.5" onClick={() => handleColorArea('tree-leaves1')} className="cursor-pointer hover:stroke-purple-500" />
          <circle cx="55" cy="150" r="20" fill={coloringColors['tree-leaves2'] || '#32cd32'} stroke="#2eb82e" strokeWidth="1.5" onClick={() => handleColorArea('tree-leaves2')} className="cursor-pointer hover:stroke-purple-500" />
          <circle cx="40" cy="155" r="15" fill={coloringColors['tree-leaves3'] || '#90ee90'} stroke="#7dd87d" strokeWidth="1.5" onClick={() => handleColorArea('tree-leaves3')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Charming cottage */}
          <rect x="180" y="150" width="70" height="45" fill={coloringColors['cottage-wall'] || '#f5deb3'} stroke="#daa520" strokeWidth="2" onClick={() => handleColorArea('cottage-wall')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Cottage roof */}
          <polygon points="170,150 215,120 260,150" fill={coloringColors['cottage-roof'] || '#dc143c'} stroke="#b22222" strokeWidth="2" onClick={() => handleColorArea('cottage-roof')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Roof tiles pattern */}
          <g stroke="#8b0000" strokeWidth="1" fill="none">
            <path d="M 175 145 Q 215 125 255 145" />
            <path d="M 180 140 Q 215 130 250 140" />
            <path d="M 185 135 Q 215 135 245 135" />
          </g>
          
          {/* Cottage door */}
          <rect x="195" y="170" width="18" height="25" fill={coloringColors['cottage-door'] || '#8b4513'} stroke="#654321" strokeWidth="2" onClick={() => handleColorArea('cottage-door')} className="cursor-pointer hover:stroke-purple-500" />
          <circle cx="208" cy="182" r="1.5" fill="#ffd700" />
          <path d="M 195 170 Q 204 165 213 170" stroke="#654321" strokeWidth="1" fill="none" />
          
          {/* Cottage windows */}
          <rect x="225" y="160" width="15" height="15" fill={coloringColors['cottage-window1'] || '#87ceeb'} stroke="#4682b4" strokeWidth="2" onClick={() => handleColorArea('cottage-window1')} className="cursor-pointer hover:stroke-purple-500" />
          <line x1="232.5" y1="160" x2="232.5" y2="175" stroke="#4682b4" strokeWidth="1" />
          <line x1="225" y1="167.5" x2="240" y2="167.5" stroke="#4682b4" strokeWidth="1" />
          
          <rect x="170" y="165" width="12" height="12" fill={coloringColors['cottage-window2'] || '#87ceeb'} stroke="#4682b4" strokeWidth="2" onClick={() => handleColorArea('cottage-window2')} className="cursor-pointer hover:stroke-purple-500" />
          <line x1="176" y1="165" x2="176" y2="177" stroke="#4682b4" strokeWidth="1" />
          <line x1="170" y1="171" x2="182" y2="171" stroke="#4682b4" strokeWidth="1" />
          
          {/* Chimney with smoke */}
          <rect x="235" y="125" width="10" height="25" fill={coloringColors['chimney'] || '#696969'} stroke="#2f4f4f" strokeWidth="2" onClick={() => handleColorArea('chimney')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Curly smoke */}
          <g fill={coloringColors['smoke'] || '#d3d3d3'} stroke="#a9a9a9" strokeWidth="1" opacity="0.8">
            <circle cx="240" cy="120" r="3" onClick={() => handleColorArea('smoke')} className="cursor-pointer hover:stroke-purple-500" />
            <circle cx="242" cy="115" r="2.5" onClick={() => handleColorArea('smoke')} className="cursor-pointer hover:stroke-purple-500" />
            <circle cx="245" cy="110" r="2" onClick={() => handleColorArea('smoke')} className="cursor-pointer hover:stroke-purple-500" />
            <circle cx="248" cy="105" r="1.5" onClick={() => handleColorArea('smoke')} className="cursor-pointer hover:stroke-purple-500" />
          </g>
          
          {/* Beautiful flower garden */}
          <g>
            {/* Sunflower */}
            <circle cx="120" cy="180" r="12" fill={coloringColors['sunflower'] || '#ffd700'} stroke="#ffb347" strokeWidth="2" onClick={() => handleColorArea('sunflower')} className="cursor-pointer hover:stroke-purple-500" />
            <circle cx="120" cy="180" r="4" fill="#8b4513" />
            <line x1="120" y1="192" x2="120" y2="210" stroke="#228b22" strokeWidth="3" />
            <ellipse cx="115" cy="195" rx="3" ry="8" fill={coloringColors['sunflower-leaf'] || '#32cd32'} stroke="#228b22" strokeWidth="1" onClick={() => handleColorArea('sunflower-leaf')} className="cursor-pointer hover:stroke-purple-500" />
          </g>
          
          <g>
            {/* Rose */}
            <circle cx="140" cy="185" r="8" fill={coloringColors['rose'] || '#ff69b4'} stroke="#ff1493" strokeWidth="2" onClick={() => handleColorArea('rose')} className="cursor-pointer hover:stroke-purple-500" />
            <circle cx="140" cy="185" r="4" fill="#ff1493" />
            <line x1="140" y1="193" x2="140" y2="205" stroke="#228b22" strokeWidth="2" />
            <ellipse cx="135" cy="198" rx="2" ry="5" fill={coloringColors['rose-leaf'] || '#32cd32'} stroke="#228b22" strokeWidth="1" onClick={() => handleColorArea('rose-leaf')} className="cursor-pointer hover:stroke-purple-500" />
          </g>
          
          <g>
            {/* Tulip */}
            <ellipse cx="160" cy="185" rx="6" ry="10" fill={coloringColors['tulip'] || '#ff6347'} stroke="#ff4500" strokeWidth="2" onClick={() => handleColorArea('tulip')} className="cursor-pointer hover:stroke-purple-500" />
            <line x1="160" y1="195" x2="160" y2="208" stroke="#228b22" strokeWidth="2" />
            <ellipse cx="165" cy="200" rx="2" ry="6" fill={coloringColors['tulip-leaf'] || '#32cd32'} stroke="#228b22" strokeWidth="1" onClick={() => handleColorArea('tulip-leaf')} className="cursor-pointer hover:stroke-purple-500" />
          </g>
          
          {/* Butterflies */}
          <g fill={coloringColors['butterfly1'] || '#ff69b4'} stroke="#ff1493" strokeWidth="1" onClick={() => handleColorArea('butterfly1')} className="cursor-pointer hover:stroke-purple-500">
            <ellipse cx="100" cy="140" rx="4" ry="6" />
            <ellipse cx="108" cy="140" rx="4" ry="6" />
            <ellipse cx="100" cy="148" rx="3" ry="4" />
            <ellipse cx="108" cy="148" rx="3" ry="4" />
            <line x1="104" y1="135" x2="104" y2="155" stroke="#000" strokeWidth="1" />
          </g>
          
          <g fill={coloringColors['butterfly2'] || '#9370db'} stroke="#8a2be2" strokeWidth="1" onClick={() => handleColorArea('butterfly2')} className="cursor-pointer hover:stroke-purple-500">
            <ellipse cx="270" cy="100" rx="3" ry="5" />
            <ellipse cx="276" cy="100" rx="3" ry="5" />
            <ellipse cx="270" cy="106" rx="2" ry="3" />
            <ellipse cx="276" cy="106" rx="2" ry="3" />
            <line x1="273" y1="96" x2="273" y2="112" stroke="#000" strokeWidth="1" />
          </g>
          
          {/* Small bushes */}
          <ellipse cx="80" cy="190" rx="15" ry="8" fill={coloringColors['bush1'] || '#90ee90'} stroke="#7dd87d" strokeWidth="1" onClick={() => handleColorArea('bush1')} className="cursor-pointer hover:stroke-purple-500" />
          <ellipse cx="260" cy="185" rx="12" ry="6" fill={coloringColors['bush2'] || '#98fb98'} stroke="#90ee90" strokeWidth="1" onClick={() => handleColorArea('bush2')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Fence */}
          <g stroke="#8b4513" strokeWidth="2" fill="none">
            <line x1="20" y1="210" x2="20" y2="225" />
            <line x1="30" y1="210" x2="30" y2="225" />
            <line x1="40" y1="210" x2="40" y2="225" />
            <line x1="15" y1="215" x2="45" y2="215" />
            <line x1="15" y1="220" x2="45" y2="220" />
          </g>
          
          {/* Birds in the sky */}
          <g stroke="#333" strokeWidth="2" fill="none">
            <path d="M 200 70 Q 205 65 210 70" />
            <path d="M 210 70 Q 215 65 220 70" />
            <path d="M 180 80 Q 185 75 190 80" />
            <path d="M 190 80 Q 195 75 200 80" />
          </g>
        </svg>
      )
    },
    {
      name: "Fruit Basket",
      svg: (
        <svg width="300" height="300" viewBox="0 0 300 300" className="border-2 border-gray-300 rounded-lg bg-white">
          {/* Background */}
          <rect x="0" y="0" width="300" height="300" fill="#f8f9fa" />
          
          {/* Table surface */}
          <ellipse cx="150" cy="280" rx="140" ry="15" fill="#e9ecef" stroke="#dee2e6" strokeWidth="1" />
          
          {/* Basket shadow */}
          <ellipse cx="155" cy="265" rx="75" ry="12" fill="#00000020" />
          
          {/* Basket base - more realistic oval */}
          <ellipse cx="150" cy="260" rx="70" ry="18" fill={coloringColors['basket-base'] || '#d4a574'} stroke="#8b4513" strokeWidth="2" onClick={() => handleColorArea('basket-base')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Basket body - better curved shape */}
          <path d="M 80 260 Q 75 220 85 190 Q 150 175 215 190 Q 225 220 220 260" fill={coloringColors['basket-body'] || '#deb887'} stroke="#8b4513" strokeWidth="2" onClick={() => handleColorArea('basket-body')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Basket rim */}
          <ellipse cx="150" cy="190" rx="70" ry="15" fill={coloringColors['basket-rim'] || '#cd853f'} stroke="#8b4513" strokeWidth="2" onClick={() => handleColorArea('basket-rim')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Basket weave pattern - more detailed */}
          <g stroke="#8b4513" strokeWidth="1.5" fill="none">
            {/* Horizontal weaves */}
            <path d="M 85 250 Q 150 235 215 250" />
            <path d="M 87 240 Q 150 225 213 240" />
            <path d="M 89 230 Q 150 215 211 230" />
            <path d="M 91 220 Q 150 205 209 220" />
            <path d="M 93 210 Q 150 195 207 210" />
            
            {/* Vertical weaves */}
            <path d="M 100 260 Q 105 225 110 190" />
            <path d="M 120 260 Q 125 220 130 185" />
            <path d="M 140 260 Q 145 215 150 180" />
            <path d="M 160 260 Q 155 215 150 180" />
            <path d="M 180 260 Q 175 220 170 185" />
            <path d="M 200 260 Q 195 225 190 190" />
          </g>
          
          {/* Basket handles - more realistic */}
          <path d="M 95 210 Q 75 170 95 130 Q 100 125 105 130 Q 85 170 105 210" fill={coloringColors['basket-handle-left'] || '#8b4513'} stroke="#654321" strokeWidth="2" onClick={() => handleColorArea('basket-handle-left')} className="cursor-pointer hover:stroke-purple-500" />
          <path d="M 205 210 Q 225 170 205 130 Q 200 125 195 130 Q 215 170 195 210" fill={coloringColors['basket-handle-right'] || '#8b4513'} stroke="#654321" strokeWidth="2" onClick={() => handleColorArea('basket-handle-right')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Red Apple - more realistic */}
          <ellipse cx="120" cy="150" rx="18" ry="22" fill={coloringColors['red-apple'] || '#dc2626'} stroke="#991b1b" strokeWidth="2" onClick={() => handleColorArea('red-apple')} className="cursor-pointer hover:stroke-purple-500" />
          <path d="M 120 128 Q 115 123 110 128" stroke="#16a34a" strokeWidth="3" fill="none" />
          <ellipse cx="115" cy="125" rx="4" ry="7" fill={coloringColors['apple-leaf'] || '#22c55e'} stroke="#16a34a" strokeWidth="1" onClick={() => handleColorArea('apple-leaf')} className="cursor-pointer hover:stroke-purple-500" />
          <ellipse cx="118" cy="140" rx="3" ry="4" fill="#ffffff40" />
          
          {/* Green Apple */}
          <ellipse cx="180" cy="145" rx="17" ry="21" fill={coloringColors['green-apple'] || '#22c55e'} stroke="#16a34a" strokeWidth="2" onClick={() => handleColorArea('green-apple')} className="cursor-pointer hover:stroke-purple-500" />
          <path d="M 180 124 Q 175 119 170 124" stroke="#16a34a" strokeWidth="3" fill="none" />
          <ellipse cx="175" cy="121" rx="4" ry="7" fill={coloringColors['green-apple-leaf'] || '#16a34a'} stroke="#15803d" strokeWidth="1" onClick={() => handleColorArea('green-apple-leaf')} className="cursor-pointer hover:stroke-purple-500" />
          <ellipse cx="178" cy="135" rx="3" ry="4" fill="#ffffff40" />
          
          {/* Orange - more detailed */}
          <circle cx="150" cy="160" r="20" fill={coloringColors['orange'] || '#f97316'} stroke="#ea580c" strokeWidth="2" onClick={() => handleColorArea('orange')} className="cursor-pointer hover:stroke-purple-500" />
          <g stroke="#ea580c" strokeWidth="1" fill="none">
            <path d="M 150 140 Q 150 160 150 180" />
            <path d="M 130 160 Q 150 160 170 160" />
            <path d="M 138 148 Q 150 160 162 172" />
            <path d="M 162 148 Q 150 160 138 172" />
          </g>
          <circle cx="150" cy="140" r="3" fill={coloringColors['orange-top'] || '#16a34a'} stroke="#15803d" strokeWidth="1" onClick={() => handleColorArea('orange-top')} className="cursor-pointer hover:stroke-purple-500" />
          <ellipse cx="148" cy="150" rx="4" ry="5" fill="#ffffff30" />
          
          {/* Banana - more realistic curve */}
          <path d="M 90 170 Q 75 150 85 130 Q 90 125 95 130 Q 105 150 95 170 Q 92 175 90 170" fill={coloringColors['banana'] || '#fbbf24'} stroke="#f59e0b" strokeWidth="2" onClick={() => handleColorArea('banana')} className="cursor-pointer hover:stroke-purple-500" />
          <path d="M 85 130 Q 90 125 95 130" fill={coloringColors['banana-tip'] || '#16a34a'} stroke="#15803d" strokeWidth="1" onClick={() => handleColorArea('banana-tip')} className="cursor-pointer hover:stroke-purple-500" />
          <g stroke="#f59e0b" strokeWidth="1" fill="none">
            <path d="M 88 165 Q 90 150 92 135" />
            <path d="M 92 165 Q 94 150 96 135" />
          </g>
          
          {/* Purple Grapes - more realistic cluster */}
          <g fill={coloringColors['purple-grapes'] || '#7c3aed'} stroke="#5b21b6" strokeWidth="1">
            <circle cx="210" cy="130" r="7" onClick={() => handleColorArea('purple-grapes')} className="cursor-pointer hover:stroke-purple-500" />
            <circle cx="220" cy="135" r="7" onClick={() => handleColorArea('purple-grapes')} className="cursor-pointer hover:stroke-purple-500" />
            <circle cx="200" cy="135" r="7" onClick={() => handleColorArea('purple-grapes')} className="cursor-pointer hover:stroke-purple-500" />
            <circle cx="210" cy="145" r="7" onClick={() => handleColorArea('purple-grapes')} className="cursor-pointer hover:stroke-purple-500" />
            <circle cx="225" cy="145" r="6" onClick={() => handleColorArea('purple-grapes')} className="cursor-pointer hover:stroke-purple-500" />
            <circle cx="195" cy="145" r="6" onClick={() => handleColorArea('purple-grapes')} className="cursor-pointer hover:stroke-purple-500" />
            <circle cx="210" cy="155" r="6" onClick={() => handleColorArea('purple-grapes')} className="cursor-pointer hover:stroke-purple-500" />
            <circle cx="220" cy="160" r="6" onClick={() => handleColorArea('purple-grapes')} className="cursor-pointer hover:stroke-purple-500" />
            <circle cx="200" cy="160" r="6" onClick={() => handleColorArea('purple-grapes')} className="cursor-pointer hover:stroke-purple-500" />
            <circle cx="210" cy="165" r="5" onClick={() => handleColorArea('purple-grapes')} className="cursor-pointer hover:stroke-purple-500" />
          </g>
          
          {/* Grape stem and leaves */}
          <line x1="210" y1="115" x2="210" y2="130" stroke="#16a34a" strokeWidth="3" />
          <path d="M 205 110 Q 210 105 215 110" stroke="#16a34a" strokeWidth="2" fill="none" />
          <ellipse cx="205" cy="112" rx="5" ry="8" fill={coloringColors['grape-leaf'] || '#22c55e'} stroke="#16a34a" strokeWidth="1" onClick={() => handleColorArea('grape-leaf')} className="cursor-pointer hover:stroke-purple-500" transform="rotate(-20 205 112)" />
          <ellipse cx="215" cy="112" rx="5" ry="8" fill={coloringColors['grape-leaf'] || '#22c55e'} stroke="#16a34a" strokeWidth="1" onClick={() => handleColorArea('grape-leaf')} className="cursor-pointer hover:stroke-purple-500" transform="rotate(20 215 112)" />
          
          {/* Strawberry - more detailed */}
          <path d="M 140 185 Q 130 175 130 165 Q 130 160 135 160 Q 145 160 155 160 Q 160 165 160 175 Q 150 185 145 190 Q 142 188 140 185" fill={coloringColors['strawberry'] || '#ef4444'} stroke="#dc2626" strokeWidth="2" onClick={() => handleColorArea('strawberry')} className="cursor-pointer hover:stroke-purple-500" />
          
          {/* Strawberry seeds */}
          <g fill="#fbbf24">
            <ellipse cx="135" cy="168" rx="1" ry="1.5" />
            <ellipse cx="145" cy="170" rx="1" ry="1.5" />
            <ellipse cx="155" cy="168" rx="1" ry="1.5" />
            <ellipse cx="140" cy="175" rx="1" ry="1.5" />
            <ellipse cx="150" cy="177" rx="1" ry="1.5" />
            <ellipse cx="145" cy="182" rx="1" ry="1.5" />
          </g>
          
          {/* Strawberry leaves - more detailed */}
          <g fill={coloringColors['strawberry-leaves'] || '#22c55e'} stroke="#16a34a" strokeWidth="1">
            <path d="M 130 160 Q 135 155 140 160" onClick={() => handleColorArea('strawberry-leaves')} className="cursor-pointer hover:stroke-purple-500" />
            <path d="M 140 160 Q 145 155 150 160" onClick={() => handleColorArea('strawberry-leaves')} className="cursor-pointer hover:stroke-purple-500" />
            <path d="M 150 160 Q 155 155 160 160" onClick={() => handleColorArea('strawberry-leaves')} className="cursor-pointer hover:stroke-purple-500" />
          </g>
          
          {/* Pear - more realistic shape */}
          <ellipse cx="110" cy="120" rx="10" ry="15" fill={coloringColors['pear-bottom'] || '#84cc16'} stroke="#65a30d" strokeWidth="2" onClick={() => handleColorArea('pear-bottom')} className="cursor-pointer hover:stroke-purple-500" />
          <ellipse cx="110" cy="108" rx="7" ry="10" fill={coloringColors['pear-top'] || '#84cc16'} stroke="#65a30d" strokeWidth="2" onClick={() => handleColorArea('pear-top')} className="cursor-pointer hover:stroke-purple-500" />
          <line x1="110" y1="95" x2="110" y2="100" stroke="#8b4513" strokeWidth="2" />
          <ellipse cx="107" cy="97" rx="2" ry="4" fill={coloringColors['pear-leaf'] || '#22c55e'} stroke="#16a34a" strokeWidth="1" onClick={() => handleColorArea('pear-leaf')} className="cursor-pointer hover:stroke-purple-500" />
          <ellipse cx="108" cy="115" rx="2" ry="3" fill="#ffffff40" />
          
          {/* Peach */}
          <ellipse cx="190" cy="175" rx="15" ry="18" fill={coloringColors['peach'] || '#fb923c'} stroke="#f97316" strokeWidth="2" onClick={() => handleColorArea('peach')} className="cursor-pointer hover:stroke-purple-500" />
          <path d="M 190 157 Q 185 152 180 157" stroke="#16a34a" strokeWidth="2" fill="none" />
          <ellipse cx="185" cy="154" rx="3" ry="5" fill={coloringColors['peach-leaf'] || '#22c55e'} stroke="#16a34a" strokeWidth="1" onClick={() => handleColorArea('peach-leaf')} className="cursor-pointer hover:stroke-purple-500" />
          <path d="M 190 157 L 190 193" stroke="#f97316" strokeWidth="1" fill="none" />
          <ellipse cx="188" cy="165" rx="3" ry="4" fill="#ffffff30" />
          
          {/* Decorative elements */}
          <g fill="#22c55e" opacity="0.6">
            <ellipse cx="70" cy="200" rx="3" ry="6" transform="rotate(15 70 200)" />
            <ellipse cx="230" cy="190" rx="3" ry="6" transform="rotate(-15 230 190)" />
            <ellipse cx="80" cy="180" rx="2" ry="4" transform="rotate(45 80 180)" />
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
