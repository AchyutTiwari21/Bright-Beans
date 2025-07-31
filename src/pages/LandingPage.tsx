import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Calculator, Languages, Puzzle, Music, Type, Sparkles, Heart, Palette } from 'lucide-react';

const LandingPage = () => {
  const activities = [
    {
      title: 'English Poems',
      description: 'Discover beautiful poems and rhymes',
      icon: BookOpen,
      path: '/poems',
      color: 'from-pink-400 to-rose-500',
      bgColor: 'bg-gradient-to-br from-pink-50 to-rose-100',
      emoji: '📝'
    },
    {
      title: 'Alphabets',
      description: 'Learn English alphabets with fun',
      icon: Type,
      path: '/alphabet',
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      emoji: '🔤'
    },
    {
      title: 'Math Games',
      description: 'Play exciting math games',
      icon: Calculator,
      path: '/math-games',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
      emoji: '🧮'
    },
    {
      title: 'Hindi Rhymes',
      description: 'Enjoy Hindi rhymes and songs',
      icon: Music,
      path: '/hindi-rhymes',
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-100',
      emoji: '🎵'
    },
    {
      title: 'Hindi Alphabet',
      description: 'Learn Hindi alphabets',
      icon: Languages,
      path: '/hindi-alphabet',
      color: 'from-purple-400 to-violet-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-violet-100',
      emoji: '🕉️'
    },
    {
      title: 'Story Telling',
      description: 'Listen to amazing stories',
      icon: BookOpen,
      path: '/stories',
      color: 'from-yellow-400 to-amber-500',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-100',
      emoji: '📚'
    },
    {
      title: 'Puzzle Games',
      description: 'Solve fun puzzles and brain teasers',
      icon: Puzzle,
      path: '/puzzles',
      color: 'from-teal-400 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-100',
      emoji: '🧩'
    },
    {
      title: 'Art & Craft',
      description: 'Draw, color, and create with joy',
      icon: Palette,
      path: '/art-and-craft',
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-100',
      emoji: '🎨'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const characterVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotate: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  };

  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-pink-300 to-yellow-200 overflow-hidden relative">
      {/* Colorful Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/50 via-yellow-200/50 to-pink-200/50"></div>
      
      {/* Rainbow Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Clouds - positioned higher */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 left-20 z-20"
        >
          <div className="hidden lg:block text-8xl opacity-90 drop-shadow-lg">☁️</div>
        </motion.div>
        
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-16 right-24 z-20"
        >
          <div className="hidden lg:block text-7xl opacity-85 drop-shadow-lg">☁️</div>
        </motion.div>

        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-12 left-1/3 z-20"
        >
          <div className="text-6xl opacity-80 drop-shadow-lg">☁️</div>
        </motion.div>

        <motion.div
          animate={{ x: [0, -15, 0], y: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-20 right-1/3 z-20"
        >
          <div className="hidden lg:block text-7xl opacity-90 drop-shadow-lg">☁️</div>
        </motion.div>

        {/* Much Bigger Rainbow Arc - positioned under clouds */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10"
        >
          <svg width="1200" height="600" viewBox="0 0 1200 600" className="w-full max-w-6xl">
            {/* Much bigger rainbow stripes with enhanced colors */}
            <path d="M 100 550 Q 600 100 1100 550" stroke="#ff1744" strokeWidth="35" fill="none" opacity="0.9" />
            <path d="M 100 550 Q 600 130 1100 550" stroke="#ff9800" strokeWidth="35" fill="none" opacity="0.9" />
            <path d="M 100 550 Q 600 160 1100 550" stroke="#ffeb3b" strokeWidth="35" fill="none" opacity="0.9" />
            <path d="M 100 550 Q 600 190 1100 550" stroke="#4caf50" strokeWidth="35" fill="none" opacity="0.9" />
            <path d="M 100 550 Q 600 220 1100 550" stroke="#2196f3" strokeWidth="35" fill="none" opacity="0.9" />
            <path d="M 100 550 Q 600 250 1100 550" stroke="#673ab7" strokeWidth="35" fill="none" opacity="0.9" />
            <path d="M 100 550 Q 600 280 1100 550" stroke="#e91e63" strokeWidth="35" fill="none" opacity="0.9" />
            
            {/* Additional rainbow glow effect */}
            <path d="M 100 550 Q 600 100 1100 550" stroke="#ff1744" strokeWidth="50" fill="none" opacity="0.3" />
            <path d="M 100 550 Q 600 130 1100 550" stroke="#ff9800" strokeWidth="50" fill="none" opacity="0.3" />
            <path d="M 100 550 Q 600 160 1100 550" stroke="#ffeb3b" strokeWidth="50" fill="none" opacity="0.3" />
            <path d="M 100 550 Q 600 190 1100 550" stroke="#4caf50" strokeWidth="50" fill="none" opacity="0.3" />
            <path d="M 100 550 Q 600 220 1100 550" stroke="#2196f3" strokeWidth="50" fill="none" opacity="0.3" />
            <path d="M 100 550 Q 600 250 1100 550" stroke="#673ab7" strokeWidth="50" fill="none" opacity="0.3" />
            <path d="M 100 550 Q 600 280 1100 550" stroke="#e91e63" strokeWidth="50" fill="none" opacity="0.3" />
          </svg>
        </motion.div>

        {/* Additional colorful background elements */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 z-5"
        >
          <div className="hidden lg:block text-9xl opacity-60">🌈</div>
        </motion.div>

        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-1/4 z-5"
        >
          <div className="hidden lg:block text-9xl opacity-70">🌈</div>
        </motion.div>

        {/* Colorful sun */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-16 right-16 z-15"
        >
          <div className="hidden lg:block text-8xl drop-shadow-lg">☀️</div>
        </motion.div>

        {/* Enhanced Cartoon Characters with more vibrant positioning */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-16"
        >
          <div className="text-5xl drop-shadow-lg">🦋</div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -25, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 right-20"
        >
          <div className="text-6xl drop-shadow-lg">🐝</div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -18, 0],
            rotate: [0, -5, 5, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 left-1/4"
        >
          <div className="text-5xl drop-shadow-lg">🐰</div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -22, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/4 right-1/3"
        >
          <div className="text-5xl drop-shadow-lg">🦊</div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -15, 0],
            x: [0, -12, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-2/3 left-12"
        >
          <div className="text-4xl drop-shadow-lg">🐸</div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-3/4 right-16"
        >
          <div className="text-5xl drop-shadow-lg">🐱</div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -16, 0],
            scale: [1, 1.15, 1],
            x: [0, 8, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute bottom-1/2 left-1/3"
        >
          <div className="text-4xl drop-shadow-lg">🐭</div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -25, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1/3 right-1/4"
        >
          <div className="text-5xl drop-shadow-lg">🐻</div>
        </motion.div>

        {/* Additional magical floating elements */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/4 left-1/2"
        >
          <div className="text-4xl drop-shadow-lg">🌈</div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/4 right-12"
        >
          <div className="text-4xl drop-shadow-lg">🌸</div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -25, 0],
            x: [0, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 right-1/2"
        >
          <div className="text-3xl drop-shadow-lg">🌺</div>
        </motion.div>

        {/* Colorful balloons */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            x: [0, 10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-16"
        >
          <div className="text-5xl drop-shadow-lg">🎈</div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -25, 0],
            x: [0, -12, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-1/3 right-20"
        >
          <div className="text-4xl drop-shadow-lg">�</div>
        </motion.div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 text-6xl opacity-20"
        >
          🌟
        </motion.div>
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-20 text-4xl opacity-30"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ x: [0, 120, 0], y: [0, -40, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 left-1/4 text-5xl opacity-25"
        >
          💫
        </motion.div>
        <motion.div
          animate={{ x: [0, -90, 0], y: [0, 70, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-1/3 text-3xl opacity-35"
        >
          🌟
        </motion.div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center py-8 md:py-12 relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <motion.div variants={sparkleVariants} animate="animate">
            <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-yellow-500" />
          </motion.div>
          <motion.h1 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 10,
              delay: 0.2 
            }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
          >
            Bright Beans
          </motion.h1>
          <motion.div variants={sparkleVariants} animate="animate">
            <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-yellow-500" />
          </motion.div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4"
        >
          Welcome to your magical learning adventure! Choose an activity to start exploring.
        </motion.p>
      </motion.header>

      {/* Cartoon Character */}
      <motion.div 
        variants={characterVariants}
        animate="animate"
        className="flex justify-center mb-8 md:mb-12 relative z-10"
      >
        <div className="relative">
          {/* Placeholder SVG Character - Replace with actual character */}
          <motion.div 
            className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-2xl border-4 border-white"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl md:text-6xl"
            >
              🐻
            </motion.div>
          </motion.div>
          
          {/* Floating hearts around character */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-2 -right-2 text-2xl"
          >
            ❤️
          </motion.div>
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [360, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-2 -left-2 text-xl"
          >
            💫
          </motion.div>
        </div>
      </motion.div>

      {/* Activities Grid */}
      <main className="container mx-auto px-4 md:px-6 pb-12 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto"
        >
          {activities.map((activity, index) => {
            return (
              <motion.div
                key={activity.path}
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={activity.path}
                  className={`${activity.bgColor} rounded-2xl md:rounded-3xl p-4 md:p-6 transition-all duration-300 shadow-lg hover:shadow-xl group block border-2 border-white/50 backdrop-blur-sm`}
                >
                  <div className="text-center">
                    <motion.div 
                      className="mb-4 flex justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-r ${activity.color} flex items-center justify-center shadow-lg`}>
                        <span className="text-2xl md:text-3xl">{activity.emoji}</span>
                      </div>
                    </motion.div>
                    
                    <motion.h3 
                      className="text-lg md:text-xl font-bold mb-2 text-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {activity.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-sm md:text-base text-gray-600 opacity-80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      transition={{ delay: index * 0.1 + 0.7 }}
                    >
                      {activity.description}
                    </motion.p>
                    
                    <motion.div
                      className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      <span className="text-xs font-semibold text-gray-500">Click to explore! →</span>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="text-center py-8 text-gray-500 relative z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center gap-2"
        >
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500" />
          <span>for little learners</span>
        </motion.div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
