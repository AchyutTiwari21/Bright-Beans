import { Link } from 'react-router-dom';
import { ArrowLeft, Volume2 } from 'lucide-react';

const HindiAlphabetPage = () => {
  const vowels = [
    { letter: 'अ', word: 'अनार', emoji: '🍎' },
    { letter: 'आ', word: 'आम', emoji: '🥭' },
    { letter: 'इ', word: 'इमली', emoji: '🌿' },
    { letter: 'ई', word: 'ईख', emoji: '🎋' },
    { letter: 'उ', word: 'उल्लू', emoji: '🦉' },
    { letter: 'ऊ', word: 'ऊंट', emoji: '🐪' },
    { letter: 'ए', word: 'एक', emoji: '1️⃣' },
    { letter: 'ऐ', word: 'ऐनक', emoji: '👓' },
    { letter: 'ओ', word: 'ओखली', emoji: '🥣' },
    { letter: 'औ', word: 'औरत', emoji: '👩' }
  ];

  const consonants = [
    { letter: 'क', word: 'कमल', emoji: '🪷' },
    { letter: 'ख', word: 'खरगोश', emoji: '🐰' },
    { letter: 'ग', word: 'गाय', emoji: '🐄' },
    { letter: 'घ', word: 'घर', emoji: '🏠' },
    { letter: 'च', word: 'चांद', emoji: '🌙' },
    { letter: 'छ', word: 'छतरी', emoji: '☂️' },
    { letter: 'ज', word: 'जहाज', emoji: '✈️' },
    { letter: 'झ', word: 'झंडा', emoji: '🚩' },
    { letter: 'ट', word: 'टमाटर', emoji: '🍅' },
    { letter: 'ठ', word: 'ठठेरा', emoji: '🔨' },
    { letter: 'ड', word: 'डमरू', emoji: '🥁' },
    { letter: 'ढ', word: 'ढोल', emoji: '🥁' },
    { letter: 'त', word: 'तितली', emoji: '🦋' },
    { letter: 'थ', word: 'थैला', emoji: '👜' },
    { letter: 'द', word: 'दीया', emoji: '🪔' },
    { letter: 'ध', word: 'धनुष', emoji: '🏹' },
    { letter: 'न', word: 'नाव', emoji: '⛵' },
    { letter: 'प', word: 'पतंग', emoji: '🪁' },
    { letter: 'फ', word: 'फूल', emoji: '🌸' },
    { letter: 'ब', word: 'बकरी', emoji: '🐐' },
    { letter: 'भ', word: 'भालू', emoji: '🐻' },
    { letter: 'म', word: 'मछली', emoji: '🐠' },
    { letter: 'य', word: 'यज्ञ', emoji: '🔥' },
    { letter: 'र', word: 'रथ', emoji: '🛺' },
    { letter: 'ल', word: 'लड्डू', emoji: '🍯' },
    { letter: 'व', word: 'वन', emoji: '🌳' },
    { letter: 'श', word: 'शेर', emoji: '🦁' },
    { letter: 'ष', word: 'षट्कोण', emoji: '⭐' },
    { letter: 'स', word: 'सूरज', emoji: '☀️' },
    { letter: 'ह', word: 'हाथी', emoji: '🐘' }
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
      utterance.lang = 'hi-IN';
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-orange-600 hover:text-orange-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-2 ml-auto">
              <h1 className="text-2xl font-bold text-orange-800">हिंदी वर्णमाला</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Vowels Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-orange-800 mb-8">स्वर (Vowels)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {vowels.map((item, index) => (
              <div
                key={item.letter}
                className={`${colors[index % colors.length]} rounded-2xl p-4 border-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer`}
                onClick={() => handleSpeak(`${item.letter} ${item.word}`)}
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
        </section>

        {/* Consonants Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-orange-800 mb-8">व्यंजन (Consonants)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
            {consonants.map((item, index) => (
              <div
                key={item.letter}
                className={`${colors[index % colors.length]} rounded-2xl p-4 border-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer`}
                onClick={() => handleSpeak(`${item.letter} ${item.word}`)}
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
        </section>

        {/* Instructions */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-orange-800 mb-4">सीखने का तरीका</h3>
            <p className="text-gray-700 text-lg mb-4">
              किसी भी अक्षर पर क्लिक करें और उसकी आवाज़ सुनें! 🔊
            </p>
            <p className="text-gray-600">
              हर अक्षर के साथ एक मज़ेदार शब्द और इमोजी है जो याद रखने में मदद करता है!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HindiAlphabetPage;
