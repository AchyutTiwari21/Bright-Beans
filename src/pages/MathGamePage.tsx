import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Trophy, Star, Plus, Minus, X, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type GameType = 'addition' | 'subtraction' | 'multiplication' | 'missing';

interface Question {
  num1: number;
  num2: number;
  answer: number;
  operation: string;
  display: string;
}

const MathGamePage = () => {
  const [gameType, setGameType] = useState<GameType>('addition');
  const [currentQuestion, setCurrentQuestion] = useState<Question>({ 
    num1: 0, 
    num2: 0, 
    answer: 0, 
    operation: '+',
    display: ''
  });
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const gameTypes = [
    { 
      type: 'addition' as GameType, 
      name: 'Addition', 
      icon: Plus, 
      color: 'from-green-400 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-100'
    },
    { 
      type: 'subtraction' as GameType, 
      name: 'Subtraction', 
      icon: Minus, 
      color: 'from-red-400 to-rose-500',
      bgColor: 'from-red-50 to-rose-100'
    },
    { 
      type: 'multiplication' as GameType, 
      name: 'Multiplication', 
      icon: X, 
      color: 'from-purple-400 to-violet-500',
      bgColor: 'from-purple-50 to-violet-100'
    },
    { 
      type: 'missing' as GameType, 
      name: 'Missing Number', 
      icon: HelpCircle, 
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-100'
    }
  ];

  const generateQuestion = () => {
    let question: Question;
    
    switch (gameType) {
      case 'addition':
        const addNum1 = Math.floor(Math.random() * 10) + 1;
        const addNum2 = Math.floor(Math.random() * 10) + 1;
        question = {
          num1: addNum1,
          num2: addNum2,
          answer: addNum1 + addNum2,
          operation: '+',
          display: `${addNum1} + ${addNum2} = ?`
        };
        break;
        
      case 'subtraction':
        const subNum1 = Math.floor(Math.random() * 10) + 5; // Ensure positive result
        const subNum2 = Math.floor(Math.random() * subNum1) + 1;
        question = {
          num1: subNum1,
          num2: subNum2,
          answer: subNum1 - subNum2,
          operation: '-',
          display: `${subNum1} - ${subNum2} = ?`
        };
        break;
        
      case 'multiplication':
        const mulNum1 = Math.floor(Math.random() * 5) + 1; // Keep numbers small
        const mulNum2 = Math.floor(Math.random() * 5) + 1;
        question = {
          num1: mulNum1,
          num2: mulNum2,
          answer: mulNum1 * mulNum2,
          operation: '×',
          display: `${mulNum1} × ${mulNum2} = ?`
        };
        break;
        
      case 'missing':
        const missingType = Math.random() < 0.5 ? 'first' : 'second';
        const baseNum1 = Math.floor(Math.random() * 10) + 1;
        const baseNum2 = Math.floor(Math.random() * 10) + 1;
        const sum = baseNum1 + baseNum2;
        
        if (missingType === 'first') {
          question = {
            num1: baseNum1,
            num2: baseNum2,
            answer: baseNum1,
            operation: '+',
            display: `? + ${baseNum2} = ${sum}`
          };
        } else {
          question = {
            num1: baseNum1,
            num2: baseNum2,
            answer: baseNum2,
            operation: '+',
            display: `${baseNum1} + ? = ${sum}`
          };
        }
        break;
        
      default:
        question = { num1: 0, num2: 0, answer: 0, operation: '+', display: '' };
    }
    
    setCurrentQuestion(question);
    setUserAnswer('');
    setShowFeedback(false);
  };

  useEffect(() => {
    generateQuestion();
  }, [gameType]);

  const handleSubmit = () => {
    const answer = parseInt(userAnswer);
    if (answer === currentQuestion.answer) {
      setScore(score + 1);
      setFeedback('🎉 Excellent! That\'s correct!');
    } else {
      setFeedback(`❌ Not quite! The correct answer is ${currentQuestion.answer}`);
    }
    setShowFeedback(true);
    setQuestionsAnswered(questionsAnswered + 1);
    
    setTimeout(() => {
      generateQuestion();
    }, 2500);
  };

  const resetGame = () => {
    setScore(0);
    setQuestionsAnswered(0);
    setFeedback('');
    setShowFeedback(false);
    generateQuestion();
  };

  const switchGameType = (type: GameType) => {
    setGameType(type);
    resetGame();
  };

  const currentGameInfo = gameTypes.find(g => g.type === gameType)!;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentGameInfo.bgColor}`}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <div className="flex items-center gap-2 ml-auto">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">Math Games</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Game Type Selection */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {gameTypes.map((game) => {
            const Icon = game.icon;
            return (
              <motion.button
                key={game.type}
                onClick={() => switchGameType(game.type)}
                className={`p-3 md:p-4 rounded-2xl transition-all duration-300 ${
                  gameType === game.type
                    ? `bg-gradient-to-r ${game.color} text-white shadow-lg scale-105`
                    : 'bg-white/80 text-gray-700 hover:bg-white shadow-md hover:shadow-lg'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm md:text-base font-semibold">{game.name}</div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Score Board */}
        <motion.div 
          className="flex justify-center gap-3 md:gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <Star className="w-4 md:w-5 h-4 md:h-5 text-yellow-500" />
              <span className="font-bold text-green-800 text-sm md:text-base">Score: {score}</span>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg">
            <span className="font-bold text-blue-800 text-sm md:text-base">Questions: {questionsAnswered}</span>
          </div>
          <motion.button
            onClick={resetGame}
            className={`bg-gradient-to-r ${currentGameInfo.color} text-white rounded-xl p-3 md:p-4 shadow-lg transition-colors flex items-center gap-2`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-4 md:w-5 h-4 md:h-5" />
            <span className="text-sm md:text-base">Reset</span>
          </motion.button>
        </motion.div>

        {/* Math Question */}
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-12 shadow-2xl text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2 
              className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${currentGameInfo.color} bg-clip-text text-transparent mb-6 md:mb-8`}
              key={gameType}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentGameInfo.name} Practice
            </motion.h2>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentQuestion.display}
                className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 md:mb-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {currentQuestion.display}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {!showFeedback ? (
                <motion.div 
                  className="space-y-4 md:space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="text-3xl md:text-4xl font-bold text-center w-24 md:w-32 h-12 md:h-16 border-4 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="?"
                    onKeyPress={(e) => e.key === 'Enter' && userAnswer && handleSubmit()}
                  />
                  <div>
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!userAnswer}
                      className={`bg-gradient-to-r ${currentGameInfo.color} hover:shadow-lg disabled:bg-gray-300 disabled:from-gray-300 disabled:to-gray-300 text-white text-lg md:text-xl font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all duration-300`}
                      whileHover={{ scale: userAnswer ? 1.05 : 1 }}
                      whileTap={{ scale: userAnswer ? 0.95 : 1 }}
                    >
                      Check Answer
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="space-y-4 md:space-y-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.div 
                    className={`text-2xl md:text-3xl font-bold text-center p-4 md:p-6 ${
                      feedback.includes('🎉') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    } rounded-xl`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {feedback}
                  </motion.div>
                  <div className="text-gray-600 text-sm md:text-base">
                    Next question coming up...
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div 
          className="mt-8 md:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-lg">
            <h3 className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${currentGameInfo.color} bg-clip-text text-transparent mb-4`}>
              Math Tips! 🧮
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {gameType === 'addition' && (
                <>
                  <div className="bg-yellow-50 p-4 rounded-xl">
                    <p className="font-semibold text-yellow-800">💡 Tip 1:</p>
                    <p className="text-yellow-700 text-sm md:text-base">Count on your fingers if you need to!</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="font-semibold text-blue-800">💡 Tip 2:</p>
                    <p className="text-blue-700 text-sm md:text-base">Start with the bigger number and count up!</p>
                  </div>
                </>
              )}
              {gameType === 'subtraction' && (
                <>
                  <div className="bg-red-50 p-4 rounded-xl">
                    <p className="font-semibold text-red-800">💡 Tip 1:</p>
                    <p className="text-red-700 text-sm md:text-base">Count backwards from the bigger number!</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl">
                    <p className="font-semibold text-orange-800">💡 Tip 2:</p>
                    <p className="text-orange-700 text-sm md:text-base">Use objects to help you subtract!</p>
                  </div>
                </>
              )}
              {gameType === 'multiplication' && (
                <>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <p className="font-semibold text-purple-800">💡 Tip 1:</p>
                    <p className="text-purple-700 text-sm md:text-base">Think of it as repeated addition!</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-xl">
                    <p className="font-semibold text-pink-800">💡 Tip 2:</p>
                    <p className="text-pink-700 text-sm md:text-base">3 × 4 means 3 + 3 + 3 + 3!</p>
                  </div>
                </>
              )}
              {gameType === 'missing' && (
                <>
                  <div className="bg-cyan-50 p-4 rounded-xl">
                    <p className="font-semibold text-cyan-800">💡 Tip 1:</p>
                    <p className="text-cyan-700 text-sm md:text-base">What number makes the equation true?</p>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-xl">
                    <p className="font-semibold text-teal-800">💡 Tip 2:</p>
                    <p className="text-teal-700 text-sm md:text-base">Try different numbers until it works!</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MathGamePage;
