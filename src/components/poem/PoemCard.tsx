import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2 } from 'lucide-react';

interface PoemData {
  id: string;
  title: string;
  content: string;
  character: string;
  characterColor: string;
  theme: string;
  audioUrl?: string;
  rhymingWords: {
    word1: string;
    word2: string;
    emoji1: string;
    emoji2: string;
  }[];
}

interface PoemCardProps {
  poem: PoemData;
  onActivityClick?: () => void;
}

const PoemCard = ({ poem, onActivityClick }: PoemCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const handlePlayAudio = () => {
    if (currentAudio) {
      if (isPlaying) {
        currentAudio.pause();
        setIsPlaying(false);
      } else {
        currentAudio.play();
        setIsPlaying(true);
      }
    } else if (poem.audioUrl) {
      const audio = new Audio(poem.audioUrl);
      audio.onended = () => setIsPlaying(false);
      audio.play();
      setCurrentAudio(audio);
      setIsPlaying(true);
    } else {
      // Fallback to speech synthesis
      const utterance = new SpeechSynthesisUtterance(poem.content);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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
      scale: 1.02,
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
      y: [0, -8, 0],
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

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`${poem.theme} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/50 backdrop-blur-sm`}
    >
      {/* Character Section */}
      <div className="text-center mb-6">
        <motion.div
          variants={characterVariants}
          animate="animate"
          className="relative inline-block"
        >
          <div className={`w-24 h-24 md:w-32 md:h-32 ${poem.characterColor} rounded-full flex items-center justify-center shadow-lg border-4 border-white mb-4 mx-auto`}>
            <motion.div
              animate={{ 
                scale: isPlaying ? [1, 1.1, 1] : 1,
                rotate: isPlaying ? [0, 5, -5, 0] : 0
              }}
              transition={{ 
                duration: 0.5, 
                repeat: isPlaying ? Infinity : 0 
              }}
              className="text-4xl md:text-5xl"
            >
              {poem.character}
            </motion.div>
          </div>
          
          {/* Floating musical notes when playing */}
          {isPlaying && (
            <>
              <motion.div
                animate={{
                  y: [0, -20, -40],
                  x: [0, 10, -5],
                  opacity: [1, 0.8, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0
                }}
                className="absolute -top-2 -right-2 text-2xl"
              >
                🎵
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -25, -50],
                  x: [0, -8, 12],
                  opacity: [1, 0.8, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
                className="absolute -top-2 -left-2 text-xl"
              >
                🎶
              </motion.div>
            </>
          )}
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
        >
          {poem.title}
        </motion.h2>
      </div>

      {/* Poem Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white/90 rounded-2xl p-6 mb-6 shadow-inner"
      >
        <pre className="text-lg leading-relaxed text-gray-700 font-medium whitespace-pre-wrap text-center">
          {poem.content}
        </pre>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <motion.button
          onClick={handlePlayAudio}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
            isPlaying 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <Volume2 className="w-5 h-5" />
          <span>{isPlaying ? 'Pause' : 'Listen'}</span>
        </motion.button>

        {onActivityClick && (
          <motion.button
            onClick={onActivityClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg"
          >
            🎯 Play Activity
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default PoemCard;
