import { Link } from 'react-router-dom';
import { ArrowLeft, Volume2 } from 'lucide-react';

const AlphabetPage = () => {
  const alphabets = [
    { letter: 'A', word: 'Apple', emoji: '🍎' },
    { letter: 'B', word: 'Ball', emoji: '⚽' },
    { letter: 'C', word: 'Cat', emoji: '🐱' },
    { letter: 'D', word: 'Dog', emoji: '🐶' },
    { letter: 'E', word: 'Elephant', emoji: '🐘' },
    { letter: 'F', word: 'Fish', emoji: '🐠' },
    { letter: 'G', word: 'Giraffe', emoji: '🦒' },
    { letter: 'H', word: 'House', emoji: '🏠' },
    { letter: 'I', word: 'Ice cream', emoji: '🍦' },
    { letter: 'J', word: 'Juice', emoji: '🧃' },
    { letter: 'K', word: 'Kite', emoji: '🪁' },
    { letter: 'L', word: 'Lion', emoji: '🦁' },
    { letter: 'M', word: 'Moon', emoji: '🌙' },
    { letter: 'N', word: 'Nest', emoji: '🪺' },
    { letter: 'O', word: 'Orange', emoji: '🍊' },
    { letter: 'P', word: 'Penguin', emoji: '🐧' },
    { letter: 'Q', word: 'Queen', emoji: '👸' },
    { letter: 'R', word: 'Rainbow', emoji: '🌈' },
    { letter: 'S', word: 'Sun', emoji: '☀️' },
    { letter: 'T', word: 'Tree', emoji: '🌳' },
    { letter: 'U', word: 'Umbrella', emoji: '☂️' },
    { letter: 'V', word: 'Violin', emoji: '🎻' },
    { letter: 'W', word: 'Whale', emoji: '🐋' },
    { letter: 'X', word: 'Xylophone', emoji: '🎵' },
    { letter: 'Y', word: 'Yacht', emoji: '🛥️' },
    { letter: 'Z', word: 'Zebra', emoji: '🦓' }
  ];

  const colors = [
    'bg-red-100 border-red-300 text-red-800',
    'bg-blue-100 border-blue-300 text-blue-800',
    'bg-green-100 border-green-300 text-green-800',
    'bg-yellow-100 border-yellow-300 text-yellow-800',
    'bg-purple-100 border-purple-300 text-purple-800',
    'bg-pink-100 border-pink-300 text-pink-800',
    'bg-indigo-100 border-indigo-300 text-indigo-800',
    'bg-orange-100 border-orange-300 text-orange-800'
  ];

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-2 ml-auto">
              <h1 className="text-2xl font-bold text-purple-800">Learn the Alphabet</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Alphabet Grid */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-w-7xl mx-auto">
          {alphabets.map((item, index) => (
            <div
              key={item.letter}
              className={`${colors[index % colors.length]} rounded-2xl p-4 border-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer`}
              onClick={() => handleSpeak(`${item.letter} for ${item.word}`)}
            >
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{item.letter}</div>
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className="text-sm font-medium">{item.word}</div>
                <Volume2 className="w-4 h-4 mx-auto mt-2 opacity-60" />
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">How to Learn</h3>
            <p className="text-gray-700 text-lg mb-4">
              Click on any letter card to hear how it sounds! 🔊
            </p>
            <p className="text-gray-600">
              Each letter comes with a fun word and emoji to help you remember better!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlphabetPage;
