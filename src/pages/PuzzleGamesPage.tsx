import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Puzzle, RotateCcw, Trophy } from 'lucide-react';

const PuzzleGamesPage = () => {
  const [selectedGame, setSelectedGame] = useState<'memory' | 'pattern' | 'colors'>('memory');
  
  // Memory Game State
  const [cards, setCards] = useState<{ id: number; emoji: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  // Pattern Game State
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [showPattern, setShowPattern] = useState(false);
  const [gameState, setGameState] = useState<'waiting' | 'showing' | 'input' | 'success' | 'fail'>('waiting');
  const [level, setLevel] = useState(1);

  // Color Game State
  const [targetColor, setTargetColor] = useState('');
  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [colorScore, setColorScore] = useState(0);

  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
  const colors = [
    { name: 'Red', value: 'bg-red-500', text: 'लाल' },
    { name: 'Blue', value: 'bg-blue-500', text: 'नीला' },
    { name: 'Green', value: 'bg-green-500', text: 'हरा' },
    { name: 'Yellow', value: 'bg-yellow-500', text: 'पीला' },
    { name: 'Purple', value: 'bg-purple-500', text: 'बैंगनी' },
    { name: 'Pink', value: 'bg-pink-500', text: 'गुलाबी' },
    { name: 'Orange', value: 'bg-orange-500', text: 'नारंगी' },
    { name: 'Indigo', value: 'bg-indigo-500', text: 'नील' }
  ];

  // Initialize Memory Game
  const initMemoryGame = () => {
    const gameEmojis = emojis.slice(0, 6);
    const duplicatedEmojis = [...gameEmojis, ...gameEmojis];
    const shuffled = duplicatedEmojis
      .map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setScore(0);
    setMoves(0);
  };

  // Initialize Pattern Game
  const initPatternGame = () => {
    const newPattern = Array.from({ length: level + 2 }, () => Math.floor(Math.random() * 4));
    setPattern(newPattern);
    setUserPattern([]);
    setGameState('showing');
    setShowPattern(true);
    
    setTimeout(() => {
      setShowPattern(false);
      setGameState('input');
    }, (level + 2) * 1000);
  };

  // Initialize Color Game
  const initColorGame = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor.name);
    
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5).slice(0, 4);
    if (!shuffledColors.find(c => c.name === randomColor.name)) {
      shuffledColors[0] = randomColor;
    }
    setColorOptions(shuffledColors.map(c => c.name));
  };

  useEffect(() => {
    if (selectedGame === 'memory') initMemoryGame();
    if (selectedGame === 'pattern') initPatternGame();
    if (selectedGame === 'colors') initColorGame();
  }, [selectedGame, level]);

  // Memory Game Logic
  const flipCard = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlippedCards;
      
      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setScore(score + 1);
          setFlippedCards([]);
        }, 1000);
      } else {
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Pattern Game Logic
  const addToUserPattern = (colorIndex: number) => {
    if (gameState !== 'input') return;
    
    const newUserPattern = [...userPattern, colorIndex];
    setUserPattern(newUserPattern);

    if (newUserPattern.length === pattern.length) {
      if (JSON.stringify(newUserPattern) === JSON.stringify(pattern)) {
        setGameState('success');
        setTimeout(() => {
          setLevel(level + 1);
        }, 1500);
      } else {
        setGameState('fail');
        setTimeout(() => {
          setLevel(1);
        }, 1500);
      }
    }
  };

  // Color Game Logic
  const selectColor = (colorName: string) => {
    if (colorName === targetColor) {
      setColorScore(colorScore + 1);
      setTimeout(initColorGame, 1000);
    } else {
      setTimeout(initColorGame, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-indigo-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-2 ml-auto">
              <Puzzle className="w-6 h-6 text-indigo-500" />
              <h1 className="text-2xl font-bold text-indigo-800">Puzzle Games</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Game Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center text-indigo-800 mb-6">Choose a Game</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedGame('memory')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedGame === 'memory'
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'bg-white/80 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              Memory Match
            </button>
            <button
              onClick={() => setSelectedGame('pattern')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedGame === 'pattern'
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'bg-white/80 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              Pattern Game
            </button>
            <button
              onClick={() => setSelectedGame('colors')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedGame === 'colors'
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'bg-white/80 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              Color Learning
            </button>
          </div>
        </div>

        {/* Memory Game */}
        {selectedGame === 'memory' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 rounded-2xl p-8 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="font-bold">Score: {score}</span>
                  </div>
                  <span className="font-bold">Moves: {moves}</span>
                </div>
                <button
                  onClick={initMemoryGame}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => flipCard(card.id)}
                    className={`aspect-square rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-center text-4xl ${
                      card.isFlipped || card.isMatched
                        ? 'bg-white shadow-lg'
                        : 'bg-indigo-200 hover:bg-indigo-300'
                    }`}
                  >
                    {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pattern Game */}
        {selectedGame === 'pattern' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-indigo-800 mb-2">Pattern Memory</h3>
                <p className="text-gray-600">Level: {level}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {gameState === 'showing' && 'Watch the pattern!'}
                  {gameState === 'input' && 'Repeat the pattern!'}
                  {gameState === 'success' && '🎉 Correct! Next level...'}
                  {gameState === 'fail' && '❌ Wrong pattern. Try again!'}
                  {gameState === 'waiting' && 'Get ready...'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    onClick={() => addToUserPattern(index)}
                    className={`aspect-square rounded-xl cursor-pointer transition-all duration-300 ${
                      showPattern && pattern.includes(index)
                        ? ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400'][index]
                        : ['bg-red-200 hover:bg-red-300', 'bg-blue-200 hover:bg-blue-300', 'bg-green-200 hover:bg-green-300', 'bg-yellow-200 hover:bg-yellow-300'][index]
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={initPatternGame}
                className="w-full py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors"
              >
                Start New Pattern
              </button>
            </div>
          </div>
        )}

        {/* Color Learning Game */}
        {selectedGame === 'colors' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-indigo-800 mb-2">Color Learning</h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold">Score: {colorScore}</span>
                </div>
                <p className="text-xl text-gray-700 mb-4">
                  Find the color: <span className="font-bold text-indigo-600">{targetColor}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {colorOptions.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => selectColor(color)}
                    className={`${color} aspect-square rounded-xl hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center`}
                  >
                    <span className="text-white font-bold text-lg">{color}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={initColorGame}
                className="w-full py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors"
              >
                New Color
              </button>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-12 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-indigo-800 mb-4">Puzzle Tips! 🧩</h3>
            <p className="text-gray-700 text-lg mb-4">
              Puzzles help improve your memory and problem-solving skills!
            </p>
            <p className="text-gray-600">
              Take your time and think carefully. Practice makes perfect! ✨
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PuzzleGamesPage;
