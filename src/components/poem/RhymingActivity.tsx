import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RotateCcw, Star } from 'lucide-react';

interface RhymingPair {
  word1: string;
  word2: string;
  emoji1: string;
  emoji2: string;
}

interface RhymingActivityProps {
  pairs: RhymingPair[];
  onComplete?: (score: number) => void;
  onClose?: () => void;
}

const RhymingActivity = ({ pairs, onComplete, onClose }: RhymingActivityProps) => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [wrongMatches, setWrongMatches] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  // Shuffle words for the activity
  const [shuffledWords, setShuffledWords] = useState<Array<{word: string, emoji: string, pairId: string}>>([]);

  useEffect(() => {
    const words = pairs.flatMap((pair, index) => [
      { word: pair.word1, emoji: pair.emoji1, pairId: `pair-${index}` },
      { word: pair.word2, emoji: pair.emoji2, pairId: `pair-${index}` }
    ]);
    setShuffledWords(words.sort(() => Math.random() - 0.5));
  }, [pairs]);

  const handleWordClick = (word: string, pairId: string) => {
    if (matchedPairs.includes(word) || wrongMatches.includes(word)) return;

    if (selectedWords.length === 0) {
      setSelectedWords([word]);
    } else if (selectedWords.length === 1) {
      const firstWord = selectedWords[0];
      const firstWordData = shuffledWords.find(w => w.word === firstWord);
      
      if (firstWordData && firstWordData.pairId === pairId && firstWord !== word) {
        // Correct match!
        setMatchedPairs([...matchedPairs, firstWord, word]);
        setScore(score + 1);
        setSelectedWords([]);
        
        // Check if game is complete
        if (matchedPairs.length + 2 === shuffledWords.length) {
          setGameComplete(true);
          onComplete?.(score + 1);
        }
      } else {
        // Wrong match
        setWrongMatches([firstWord, word]);
        setTimeout(() => {
          setWrongMatches([]);
          setSelectedWords([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setSelectedWords([]);
    setMatchedPairs([]);
    setWrongMatches([]);
    setScore(0);
    setGameComplete(false);
    const words = pairs.flatMap((pair, index) => [
      { word: pair.word1, emoji: pair.emoji1, pairId: `pair-${index}` },
      { word: pair.word2, emoji: pair.emoji2, pairId: `pair-${index}` }
    ]);
    setShuffledWords(words.sort(() => Math.random() - 0.5));
  };

  const getWordState = (word: string) => {
    if (matchedPairs.includes(word)) return 'matched';
    if (wrongMatches.includes(word)) return 'wrong';
    if (selectedWords.includes(word)) return 'selected';
    return 'default';
  };

  const wordVariants = {
    default: { 
      scale: 1, 
      backgroundColor: '#f3f4f6',
      borderColor: '#d1d5db'
    },
    selected: { 
      scale: 1.05, 
      backgroundColor: '#dbeafe',
      borderColor: '#3b82f6'
    },
    matched: { 
      scale: 1.02, 
      backgroundColor: '#dcfce7',
      borderColor: '#16a34a'
    },
    wrong: { 
      scale: 0.95, 
      backgroundColor: '#fee2e2',
      borderColor: '#dc2626'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-bold text-purple-800">Match the Rhyming Words!</h3>
            <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-600" />
              <span className="font-semibold text-yellow-800">Score: {score}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <motion.button
              onClick={resetGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </motion.button>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
            >
              ✕
            </motion.button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-2xl p-4 mb-6">
          <p className="text-blue-800 text-center">
            Click on two words that rhyme with each other! 🎵
          </p>
        </div>

        {/* Game Complete Message */}
        <AnimatePresence>
          {gameComplete && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="bg-green-100 border-2 border-green-300 rounded-2xl p-6 mb-6 text-center"
            >
              <div className="text-4xl mb-2">🎉</div>
              <h4 className="text-2xl font-bold text-green-800 mb-2">Congratulations!</h4>
              <p className="text-green-700">You matched all the rhyming words! Score: {score}/{pairs.length}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Words Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {shuffledWords.map((wordData, index) => {
            const state = getWordState(wordData.word);
            return (
              <motion.button
                key={`${wordData.word}-${index}`}
                variants={wordVariants}
                animate={state}
                onClick={() => handleWordClick(wordData.word, wordData.pairId)}
                disabled={matchedPairs.includes(wordData.word) || wrongMatches.includes(wordData.word)}
                className="relative p-4 rounded-2xl border-2 transition-all duration-300 disabled:cursor-not-allowed"
                whileHover={state === 'default' ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{wordData.emoji}</div>
                  <div className="font-bold text-lg text-gray-800">{wordData.word}</div>
                </div>

                {/* Status Icons */}
                <AnimatePresence>
                  {state === 'matched' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1"
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                  )}
                  {state === 'wrong' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">Progress</span>
            <span className="text-sm font-semibold text-gray-600">
              {matchedPairs.length / 2} / {pairs.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(matchedPairs.length / 2 / pairs.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RhymingActivity;
