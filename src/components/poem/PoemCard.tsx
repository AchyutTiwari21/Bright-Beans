import { motion } from 'framer-motion';

interface PoemData {
  id: string;
  title: string;
  content: string;
  character: string;
  characterColor: string;
  theme: string;
  videoUrl: string;
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

  const isHindiContent = poem.title.match(/[\u0900-\u097F]/);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`${poem.theme} w-full rounded-3xl py-4 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/50 backdrop-blur-sm`}
    >
      <div className="text-center mb-6">
        <motion.div
          variants={characterVariants}
          animate="animate"
          className="relative inline-block"
        >
          <div className={`w-24 h-24 md:w-32 md:h-32 ${poem.characterColor} rounded-full flex items-center justify-center shadow-lg border-4 border-white mb-4 mx-auto`}>
            <motion.div
              transition={{ 
                duration: 0.5, 
              }}
              className="text-4xl md:text-5xl"
            >
              {poem.character}
            </motion.div>
          </div>
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

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 px-1 lg:px-8'>

      <div className="flex justify-center items-center bg-transparent border-0 px-0 mb-6 shadow-lg lg:w-[560px] lg:h-[315px]">
        <iframe 
        width="560" 
        height="315" 
        src={`${poem.videoUrl}`} 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen>
        </iframe>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center bg-white/90 rounded-2xl p-6 mb-6 shadow-inner"
      >
        <pre className={`${poem.id === "lakdi-kathi" ? 'text-sm' : 'text-lg lg:text-2xl'} leading-relaxed text-gray-700 font-medium whitespace-pre-wrap text-center`}>
          {poem.content}
        </pre>
      </motion.div>

      </div>

      {onActivityClick && (
        <div className="flex justify-center">
          <motion.button
            onClick={onActivityClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg"
          >
            🎯 {isHindiContent ? 'गेम खेलें' : 'Play Activity'}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default PoemCard;
