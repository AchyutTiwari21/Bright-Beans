import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Trophy, Star } from 'lucide-react';

const MathGamePage = () => {
  const [currentQuestion, setCurrentQuestion] = useState({ num1: 0, num2: 0, answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    setCurrentQuestion({ num1, num2, answer });
    setUserAnswer('');
    setShowFeedback(false);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleSubmit = () => {
    const answer = parseInt(userAnswer);
    if (answer === currentQuestion.answer) {
      setScore(score + 1);
      setFeedback('🎉 Correct! Well done!');
    } else {
      setFeedback(`❌ Oops! The correct answer is ${currentQuestion.answer}`);
    }
    setShowFeedback(true);
    setQuestionsAnswered(questionsAnswered + 1);
    
    setTimeout(() => {
      generateQuestion();
    }, 2000);
  };

  const resetGame = () => {
    setScore(0);
    setQuestionsAnswered(0);
    setFeedback('');
    setShowFeedback(false);
    generateQuestion();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-2 ml-auto">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <h1 className="text-2xl font-bold text-green-800">Math Games</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Game Area */}
      <main className="container mx-auto px-6 py-8">
        {/* Score Board */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-green-800">Score: {score}</span>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <span className="font-bold text-blue-800">Questions: {questionsAnswered}</span>
          </div>
          <button
            onClick={resetGame}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl p-4 shadow-lg transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Math Question */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Addition Practice</h2>
            
            <div className="text-6xl font-bold text-blue-600 mb-8">
              {currentQuestion.num1} + {currentQuestion.num2} = ?
            </div>

            {!showFeedback ? (
              <div className="space-y-6">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="text-4xl font-bold text-center w-32 h-16 border-4 border-blue-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="?"
                  onKeyPress={(e) => e.key === 'Enter' && userAnswer && handleSubmit()}
                />
                <div>
                  <button
                    onClick={handleSubmit}
                    disabled={!userAnswer}
                    className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white text-xl font-bold px-8 py-4 rounded-xl transition-colors"
                  >
                    Check Answer
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-3xl font-bold text-center p-6 bg-blue-50 rounded-xl">
                  {feedback}
                </div>
                <div className="text-gray-600">
                  Next question coming up...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Math Tips! 🧮</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="bg-yellow-50 p-4 rounded-xl">
                <p className="font-semibold text-yellow-800">💡 Tip 1:</p>
                <p className="text-yellow-700">Count on your fingers if you need to!</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="font-semibold text-blue-800">💡 Tip 2:</p>
                <p className="text-blue-700">Start with the bigger number and count up!</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MathGamePage;
