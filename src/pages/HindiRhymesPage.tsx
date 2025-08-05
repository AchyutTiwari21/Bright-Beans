import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Music } from 'lucide-react';
import PoemCard from '../components/poem/PoemCard';
import RhymingActivity from '../components/poem/RhymingActivity';

const HindiRhymesPage = () => {
  const [selectedRhyme, setSelectedRhyme] = useState<string | null>(null);
  const [showActivity, setShowActivity] = useState(false);

  const rhymes = [
    {
      id: 'chanda-mama',
      title: "चंदा मामा दूर के",
      content: `चंदा मामा दूर के,
पुए पकाएं बूर के।
आप खाएं थाली में,
मुन्ने को दें प्याली में।
प्याली गई टूट,
मुन्ना गया रूठ।`,
      character: '🌙',
      characterColor: 'bg-gradient-to-br from-blue-300 to-indigo-400',
      theme: "bg-gradient-to-br from-blue-100 to-indigo-100",
      videoUrl: "https://www.youtube.com/embed/v8ZxNTm4EAE?si=f_H7gTUkLv28zFxT",
      rhymingWords: [
        { word1: 'के', word2: 'बूर के', emoji1: '🌙', emoji2: '🍪' },
        { word1: 'में', word2: 'प्याली में', emoji1: '🍽️', emoji2: '🥛' },
        { word1: 'टूट', word2: 'रूठ', emoji1: '💔', emoji2: '😢' }
      ]
    },
    {
      id: 'aloo-kachalu',
      title: "आलू कचालू",
      content: `"आलू कचालू बेटा, कहाँ गए थे? कद्दू की टोकरी में सो रहे थे। कद्दू ने लात मारी, रो रहे थे। मम्मी ने प्यार किया, हँस रहे थे। पापा ने पैसे दिए, नाच रहे थे। भैया ने लड्डू दिए, खा रहे थे।"`,
      character: '🥔',
      characterColor: 'bg-gradient-to-br from-yellow-300 to-amber-400',
      theme: "bg-gradient-to-br from-green-100 to-teal-100",
      videoUrl: "https://www.youtube.com/embed/MKlM07RkGU0?si=JiuaXvkA5iu2M1D-",
      rhymingWords: [
        { word1: 'बेटा', word2: 'थे', emoji1: '👶', emoji2: '❓' },
        { word1: 'में', word2: 'थे', emoji1: '🌳', emoji2: '😴' },
        { word1: 'मारी', word2: 'आए', emoji1: '🦵', emoji2: '🏠' }
      ]
    },
    {
      id: 'machli-rani',
      title: "मछली जल की रानी है",
      content: `मछली जल की रानी है,
जीवन उसका पानी है।
हाथ लगाओ डर जाएगी,
बाहर निकालो मर जाएगी।`,
      character: '🐠',
      characterColor: 'bg-gradient-to-br from-cyan-300 to-blue-400',
      theme: "bg-gradient-to-br from-cyan-100 to-blue-100",
      videoUrl: "https://www.youtube.com/embed/CUciBrtqFGM?si=-mOtyc5m2q_EFubg",
      rhymingWords: [
        { word1: 'रानी है', word2: 'पानी है', emoji1: '👸', emoji2: '💧' },
        { word1: 'जाएगी', word2: 'जाएगी', emoji1: '😨', emoji2: '💀' }
      ]
    },
    {
      id: 'nani-morni',
      title: "नानी तेरी मोरनी",
      content: `नानी तेरी मोरनी को मोर ले गए,
बाकी जो बचा था काले चोर ले गए।
नानी तेरी मोरनी को मोर ले गए,
बाकी जो बचा था काले चोर ले गए।`,
      character: '🦚',
      characterColor: 'bg-gradient-to-br from-green-400 to-emerald-500',
      theme: "bg-gradient-to-br from-purple-100 to-pink-100",
      videoUrl: "https://www.youtube.com/embed/k8sN7Vl3IFQ?si=F0xWo0DiusjIdhBX",
      rhymingWords: [
        { word1: 'गए', word2: 'गए', emoji1: '🦚', emoji2: '🦚' },
        { word1: 'हैं', word2: 'हैं', emoji1: '😭', emoji2: '😭' }
      ]
    },
    {
      id: 'lakdi-kathi',
      title: "लकड़ी की काठी",
      content: `लकड़ी की काठी काठी पे घोड़ा
घोड़े की दुम पे जो मारा हथौड़ा

दौड़ा दौड़ा दौड़ा घोड़ा दुम उठा के दौड़ा
घोड़ा पहुँचा चौक में चौक में था नाई

घोड़े जी की नाई ने हजामत जो बनाई
दौड़ा दौड़ा दौड़ा घोड़ा दुम उठा के दौड़ा

घोड़ा था घमंडी पहुँचा सब्ज़ी मंडी
सब्ज़ी मंडी बर्फ़ पड़ी थी बर्फ़ में लग गई ठंडी

दौड़ा दौड़ा दौड़ा घोड़ा दुम उठा के दौड़ा
घोड़ा अपना तगड़ा है देखो कितनी चर्बी है

चलता है मेहरौली में पर घोड़ा अपना अरबी है
हाथ छुड़ा के दौड़ा घोड़ा दुम उठा के दौड़ा

लकड़ी की काठी काठी पे घोड़ा
घोड़े की दुम पे जो मारा हथौड़ा

दौड़ा दौड़ा दौड़ा घोड़ा दुम उठा के दौड़ा`,
      character: '🐎',
      characterColor: 'bg-gradient-to-br from-amber-400 to-orange-500',
      theme: "bg-gradient-to-br from-yellow-100 to-orange-100",
      videoUrl: "https://www.youtube.com/embed/P2r7LoytBfo?si=0GungSwQ6U8n5i2A",
      rhymingWords: [
        { word1: 'काठी', word2: 'घोड़ा', emoji1: '🪑', emoji2: '🐎' },
        { word1: 'मोड़ा', word2: 'खोला', emoji1: '🎀', emoji2: '🔓' }
      ]
    }
  ];

  const getCurrentRhyme = () => {
    return rhymes.find(rhyme => rhyme.id === selectedRhyme);
  };

  const handleActivityComplete = (score: number) => {
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-10"
      >
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
              <Music className="w-6 h-6 text-orange-500" />
              <h1 className="text-2xl font-bold text-orange-800">हिंदी बालगीत</h1>
              <Music className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-2 lg:px-6 py-8">
        <AnimatePresence mode="wait">
          {!selectedRhyme ? (
            // Rhymes Grid
            <motion.div
              key="rhymes-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {rhymes.map((rhyme) => (
                <motion.div
                  key={rhyme.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRhyme(rhyme.id)}
                  className={`${rhyme.theme} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-white/50 backdrop-blur-sm`}
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
                      className={`w-20 h-20 ${rhyme.characterColor} rounded-full flex items-center justify-center shadow-lg border-4 border-white mb-4 mx-auto`}
                    >
                      <span className="text-3xl">{rhyme.character}</span>
                    </motion.div>

                    <h2 className="text-xl font-bold text-gray-800 mb-3">{rhyme.title}</h2>
                    <p className="text-sm text-gray-600 mb-4">सुनने के लिए क्लिक करें!</p>
                    
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-xs font-semibold text-orange-600">🎵 इंटरैक्टिव गीत</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Selected Rhyme View
            <motion.div
              key="rhyme-detail"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="min-w-full mx-auto px-0"
            >
              <div className="mb-6">
                <motion.button
                  onClick={() => setSelectedRhyme(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  वापस गीतों पर
                </motion.button>
              </div>

              <PoemCard
                poem={getCurrentRhyme()!}
                onActivityClick={() => setShowActivity(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fun Section */}
        {!selectedRhyme && (
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
                  color: ['#ea580c', '#dc2626', '#c2410c', '#ea580c']
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-2xl font-bold mb-4"
              >
                मज़ेदार तथ्य! 🌟
              </motion.h3>
              <p className="text-gray-700 text-lg mb-4">
                हिंदी बालगीत हमारी संस्कृति का हिस्सा हैं! 🎵
              </p>
              <p className="text-gray-600">
                ये गीत हमें नई चीज़ें सिखाते हैं और हमारी भाषा को बेहतर बनाते हैं। खेल भी खेलें! 🎭
              </p>
            </div>
          </motion.div>
        )}
      </main>

      {/* Rhyming Activity Modal */}
      <AnimatePresence>
        {showActivity && getCurrentRhyme() && (
          <RhymingActivity
            pairs={getCurrentRhyme()!.rhymingWords}
            onComplete={handleActivityComplete}
            onClose={() => setShowActivity(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HindiRhymesPage;
