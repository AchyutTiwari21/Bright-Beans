import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star } from 'lucide-react';
import PoemCard from '../components/poem/PoemCard';
import RhymingActivity from '../components/poem/RhymingActivity';

const PoemPage = () => {
  const [selectedPoem, setSelectedPoem] = useState<string | null>(null);
  const [showActivity, setShowActivity] = useState(false);

  const poems = [
    {
      id: 'twinkle-star',
      title: "Twinkle, Twinkle, Little Star",
      content: `Twinkle, twinkle, little star,
How I wonder what you are!
Up above the world so high,
Like a diamond in the sky.
Twinkle, twinkle, little star,
How I wonder what you are!`,
      character: '⭐',
      characterColor: 'bg-gradient-to-br from-yellow-300 to-amber-400',
      theme: "bg-gradient-to-br from-yellow-100 to-amber-100",
      audioUrl: '/assets/audio/twinkle_star_english.mp3',
      audioUrlHindi: '/assets/audio/twinkle_star_hindi.mp3',
      backgroundMusicUrl: '/assets/audio/gentle_lullaby_music.mp3',
      rhymingWords: [
        { word1: 'star', word2: 'are', emoji1: '⭐', emoji2: '❓' },
        { word1: 'high', word2: 'sky', emoji1: '⬆️', emoji2: '🌌' }
      ]
    },
    {
      id: 'mary-lamb',
      title: "Mary Had a Little Lamb",
      content: `Mary had a little lamb,
Its fleece was white as snow.
And everywhere that Mary went,
The lamb was sure to go.

It followed her to school one day,
Which was against the rule.
It made the children laugh and play
To see a lamb at school.`,
      character: '🐑',
      characterColor: 'bg-gradient-to-br from-pink-300 to-rose-400',
      theme: "bg-gradient-to-br from-pink-100 to-rose-100",
      audioUrl: '/assets/audio/mary_lamb_english.mp3',
      backgroundMusicUrl: '/assets/audio/playful_children_music.mp3',
      rhymingWords: [
        { word1: 'lamb', word2: 'snow', emoji1: '🐑', emoji2: '❄️' },
        { word1: 'went', word2: 'go', emoji1: '🚶', emoji2: '➡️' },
        { word1: 'day', word2: 'rule', emoji1: '📅', emoji2: '📏' },
        { word1: 'play', word2: 'school', emoji1: '🎮', emoji2: '🏫' }
      ]
    },
    {
      id: 'humpty-dumpty',
      title: "Humpty Dumpty",
      content: `Humpty Dumpty sat on a wall,
Humpty Dumpty had a great fall.
All the king's horses and all the king's men,
Couldn't put Humpty together again.`,
      character: '🥚',
      characterColor: 'bg-gradient-to-br from-orange-300 to-red-400',
      theme: "bg-gradient-to-br from-orange-100 to-red-100",
      audioUrl: '/assets/audio/humpty_dumpty_english.mp3',
      backgroundMusicUrl: '/assets/audio/whimsical_nursery_music.mp3',
      rhymingWords: [
        { word1: 'wall', word2: 'fall', emoji1: '🧱', emoji2: '⬇️' },
        { word1: 'men', word2: 'again', emoji1: '👨', emoji2: '🔄' }
      ]
    },
    {
      id: 'baa-sheep',
      title: "Baa, Baa, Black Sheep",
      content: `Baa, baa, black sheep,
Have you any wool?
Yes sir, yes sir,
Three bags full.

One for the master,
One for the dame,
And one for the little boy,
Who lives down the lane.`,
      character: '🐑',
      characterColor: 'bg-gradient-to-br from-gray-400 to-slate-500',
      theme: "bg-gradient-to-br from-gray-100 to-slate-100",
      audioUrl: '/assets/audio/baa_sheep_english.mp3',
      backgroundMusicUrl: '/assets/audio/countryside_music.mp3',
      rhymingWords: [
        { word1: 'sheep', word2: 'wool', emoji1: '🐑', emoji2: '🧶' },
        { word1: 'sir', word2: 'full', emoji1: '👨', emoji2: '🎒' },
        { word1: 'dame', word2: 'lane', emoji1: '👩', emoji2: '🛤️' }
      ]
    },
    {
      id: 'hickory-dock',
      title: "Hickory Dickory Dock",
      content: `Hickory dickory dock,
The mouse ran up the clock.
The clock struck one,
The mouse ran down,
Hickory dickory dock.`,
      character: '🐭',
      characterColor: 'bg-gradient-to-br from-brown-400 to-amber-500',
      theme: "bg-gradient-to-br from-brown-100 to-amber-100",
      audioUrl: '/assets/audio/hickory_dock_english.mp3',
      backgroundMusicUrl: '/assets/audio/clock_ticking_music.mp3',
      rhymingWords: [
        { word1: 'dock', word2: 'clock', emoji1: '⚓', emoji2: '🕐' },
        { word1: 'one', word2: 'down', emoji1: '1️⃣', emoji2: '⬇️' }
      ]
    },
    {
      id: 'row-boat',
      title: "Row, Row, Row Your Boat",
      content: `Row, row, row your boat,
Gently down the stream.
Merrily, merrily, merrily, merrily,
Life is but a dream.`,
      character: '🚣',
      characterColor: 'bg-gradient-to-br from-blue-400 to-cyan-500',
      theme: "bg-gradient-to-br from-blue-100 to-cyan-100",
      audioUrl: '/assets/audio/row_boat_english.mp3',
      backgroundMusicUrl: '/assets/audio/gentle_water_music.mp3',
      rhymingWords: [
        { word1: 'boat', word2: 'stream', emoji1: '🚣', emoji2: '🌊' },
        { word1: 'merrily', word2: 'dream', emoji1: '😊', emoji2: '💭' }
      ]
    }
  ];

  const getCurrentPoem = () => {
    return poems.find(poem => poem.id === selectedPoem);
  };

  const handleActivityComplete = (score: number) => {
    // Handle activity completion
    console.log('Activity completed with score:', score);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-10"
      >
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
              <Star className="w-6 h-6 text-yellow-500" />
              <h1 className="text-2xl font-bold text-purple-800">Beautiful Poems</h1>
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {!selectedPoem ? (
            // Poems Grid
            <motion.div
              key="poems-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {poems.map((poem) => (
                <motion.div
                  key={poem.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPoem(poem.id)}
                  className={`${poem.theme} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-white/50 backdrop-blur-sm`}
                >
                  <div className="text-center">
                    {/* Character */}
                    <motion.div
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className={`w-20 h-20 ${poem.characterColor} rounded-full flex items-center justify-center shadow-lg border-4 border-white mb-4 mx-auto`}
                    >
                      <span className="text-3xl">{poem.character}</span>
                    </motion.div>

                    <h2 className="text-xl font-bold text-gray-800 mb-3">{poem.title}</h2>
                    <p className="text-sm text-gray-600 mb-4">Click to read and listen!</p>
                    
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-xs font-semibold text-purple-600">🎵 Interactive Poem</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Selected Poem View
            <motion.div
              key="poem-detail"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-6">
                <motion.button
                  onClick={() => setSelectedPoem(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Poems
                </motion.button>
              </div>

              <PoemCard
                poem={getCurrentPoem()!}
                onActivityClick={() => setShowActivity(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fun Section */}
        {!selectedPoem && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
              <motion.h3 
                animate={{ 
                  scale: [1, 1.05, 1],
                  color: ['#7c3aed', '#ec4899', '#3b82f6', '#7c3aed']
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-2xl font-bold mb-4"
              >
                Did You Know? 🌟
              </motion.h3>
              <p className="text-gray-700 text-lg mb-4">
                Poems help us learn new words, improve our memory, and express our feelings! 
              </p>
              <p className="text-gray-600">
                Try reading these poems out loud and play the rhyming games! 🎭
              </p>
            </div>
          </motion.div>
        )}
      </main>

      {/* Rhyming Activity Modal */}
      <AnimatePresence>
        {showActivity && getCurrentPoem() && (
          <RhymingActivity
            pairs={getCurrentPoem()!.rhymingWords}
            onComplete={handleActivityComplete}
            onClose={() => setShowActivity(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PoemPage;
