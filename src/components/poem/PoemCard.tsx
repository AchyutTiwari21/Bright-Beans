import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Languages, Music } from 'lucide-react';

interface PoemData {
  id: string;
  title: string;
  content: string;
  character: string;
  characterColor: string;
  theme: string;
  audioUrl?: string;
  audioUrlHindi?: string;
  backgroundMusicUrl?: string;
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
  const [currentLanguage, setCurrentLanguage] = useState<'english' | 'hindi'>('english');
  const [mainAudio, setMainAudio] = useState<HTMLAudioElement | null>(null);
  const [backgroundAudio, setBackgroundAudio] = useState<HTMLAudioElement | null>(null);
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const volume = 0.8;
  const backgroundVolume = 0.3;
  const [isMuted, setIsMuted] = useState(false);
  // const [voicesLoaded, setVoicesLoaded] = useState(false);

  const [audioLevels, setAudioLevels] = useState<number[]>([0, 0, 0, 0, 0]);

  // useEffect(() => {
    // const loadVoices = () => {
      // const voices = speechSynthesis.getVoices();
      // if (voices.length > 0) {
      //   setVoicesLoaded(true);
      // }
    // };

    // loadVoices();
    // speechSynthesis.addEventListener('voiceschanged', loadVoices);

    // return () => {
    //   speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    // };
  // }, []);

  useEffect(() => {
    return () => {
      if (mainAudio) {
        mainAudio.pause();
        mainAudio.src = '';
      }
      if (backgroundAudio) {
        backgroundAudio.pause();
        backgroundAudio.src = '';
      }
      if (speechUtterance) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioLevels(prev => prev.map(() => Math.random() * 100));
      }, 200);
    } else {
      setAudioLevels([0, 0, 0, 0, 0]);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getCurrentAudioUrl = () => {
    if (currentLanguage === 'hindi' && poem.audioUrlHindi) {
      return poem.audioUrlHindi;
    }
    return poem.audioUrl || `/assets/audio/${poem.id}_${currentLanguage}.mp3`;
  };

  const getBackgroundMusicUrl = () => {
    return poem.backgroundMusicUrl || '/assets/audio/bg_music.mp3';
  };

  const getBestVoice = (language: 'english' | 'hindi') => {
    const voices = speechSynthesis.getVoices();
    
    if (language === 'hindi') {
      const hindiVoices = voices.filter(voice => 
        voice.lang.includes('hi') || 
        voice.lang.includes('HI') ||
        voice.name.toLowerCase().includes('hindi') ||
        voice.name.toLowerCase().includes('devanagari')
      );
      
      if (hindiVoices.length > 0) {
        const femaleHindiVoice = hindiVoices.find(voice => 
          voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('priya') ||
          voice.name.toLowerCase().includes('kalpana')
        );
        return femaleHindiVoice || hindiVoices[0];
      }
    }
    
    const englishVoices = voices.filter(voice => 
      voice.lang.includes('en') || voice.lang.includes('EN')
    );
    
    const melodiousVoices = englishVoices.filter(voice => 
      voice.name.toLowerCase().includes('samantha') ||
      voice.name.toLowerCase().includes('karen') ||
      voice.name.toLowerCase().includes('moira') ||
      voice.name.toLowerCase().includes('fiona') ||
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('woman') ||
      voice.name.toLowerCase().includes('natural')
    );
    
    return melodiousVoices[0] || englishVoices[0] || voices[0];
  };

  const createMelodiousSpeech = (text: string, language: 'english' | 'hindi') => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (language === 'hindi') {
      utterance.rate = 0.6; 
      utterance.pitch = 1.2; 
      utterance.volume = isMuted ? 0 : 0.9;
      utterance.lang = 'hi-IN';
    } else {
      utterance.rate = 0.7; 
      utterance.pitch = 1.3; 
      utterance.volume = isMuted ? 0 : 0.9;
      utterance.lang = 'en-US';
    }
    
    const bestVoice = getBestVoice(language);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }
    
    return utterance;
  };

  const handlePlayAudio = async () => {
    try {
      if (isPlaying) {
        if (mainAudio) {
          mainAudio.pause();
        }
        if (backgroundAudio) {
          backgroundAudio.pause();
        }
        if (speechUtterance) {
          speechSynthesis.cancel();
        }
        setIsPlaying(false);
        return;
      }

      const isHindiContent = poem.title.match(/[\u0900-\u097F]/) || currentLanguage === 'hindi';
      const audioLanguage = isHindiContent ? 'hindi' : 'english';
      
      const audioUrl = getCurrentAudioUrl();
      const bgMusicUrl = getBackgroundMusicUrl();

      if (mainAudio) {
        mainAudio.pause();
      }
      
      const newMainAudio = new Audio(audioUrl);
      newMainAudio.volume = isMuted ? 0 : volume;
      newMainAudio.onended = () => {
        setIsPlaying(false);
        if (backgroundAudio) {
          backgroundAudio.pause();
        }
      };
      newMainAudio.onerror = () => {
        const utterance = createMelodiousSpeech(poem.content, audioLanguage);
        
        utterance.onend = () => {
          setIsPlaying(false);
          setSpeechUtterance(null);
          if (backgroundAudio) {
            backgroundAudio.pause();
          }
        };
        
        utterance.onerror = () => {
          console.error('Speech synthesis failed');
          setIsPlaying(false);
          setSpeechUtterance(null);
        };
        
        setSpeechUtterance(utterance);
        speechSynthesis.speak(utterance);
        setIsPlaying(true);
        return;
      };

      if (bgMusicUrl) {
        const newBackgroundAudio = new Audio(bgMusicUrl);
        newBackgroundAudio.volume = isMuted ? 0 : backgroundVolume;
        newBackgroundAudio.loop = true;
        newBackgroundAudio.onerror = () => {
          console.log('Background music not found');
        };
        setBackgroundAudio(newBackgroundAudio);
        
        try {
          await newBackgroundAudio.play();
        } catch (e) {
          console.log('Background music autoplay blocked');
        }
      }

      setMainAudio(newMainAudio);
      
      try {
        await newMainAudio.play();
        setIsPlaying(true);
      } catch (e) {
        console.log('Main audio autoplay blocked, using speech synthesis');
        
        const utterance = createMelodiousSpeech(poem.content, audioLanguage);
        
        utterance.onend = () => {
          setIsPlaying(false);
          setSpeechUtterance(null);
          if (backgroundAudio) {
            backgroundAudio.pause();
          }
        };
        
        setSpeechUtterance(utterance);
        speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    
    if (mainAudio) {
      mainAudio.volume = newMuted ? 0 : volume;
    }
    if (backgroundAudio) {
      backgroundAudio.volume = newMuted ? 0 : backgroundVolume;
    }
    if (speechUtterance && speechSynthesis.speaking) {
      speechSynthesis.cancel();
      if (!newMuted && isPlaying) {
        setTimeout(() => {
          const isHindiContent = poem.title.match(/[\u0900-\u097F]/) || currentLanguage === 'hindi';
          const audioLanguage = isHindiContent ? 'hindi' : 'english';
          const utterance = createMelodiousSpeech(poem.content, audioLanguage);
          
          utterance.onend = () => {
            setIsPlaying(false);
            setSpeechUtterance(null);
          };
          
          setSpeechUtterance(utterance);
          speechSynthesis.speak(utterance);
        }, 100);
      }
    }
  };

  const switchLanguage = () => {
    const newLanguage = currentLanguage === 'english' ? 'hindi' : 'english';
    setCurrentLanguage(newLanguage);
    
    if (isPlaying) {
      setIsPlaying(false);
      if (mainAudio) mainAudio.pause();
      if (backgroundAudio) backgroundAudio.pause();
      if (speechUtterance) speechSynthesis.cancel();
      
      setTimeout(() => {
        handlePlayAudio();
      }, 200);
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

  const audioPlayerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.3
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
      className={`${poem.theme} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/50 backdrop-blur-sm`}
    >
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
          
          <AnimatePresence>
            {isPlaying && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    y: [0, -20, -40],
                    x: [0, 10, -5],
                    opacity: [1, 0.8, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  exit={{ opacity: 0, scale: 0 }}
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
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    y: [0, -25, -50],
                    x: [0, -8, 12],
                    opacity: [1, 0.8, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  exit={{ opacity: 0, scale: 0 }}
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
          </AnimatePresence>
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

      <motion.div
        variants={audioPlayerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border border-gray-200"
      >
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            🎧 {isHindiContent ? 'ऑडियो प्लेयर' : 'Audio Player'}
          </h3>
          <p className="text-sm text-gray-600">
            {isHindiContent ? 'सुनें और गाएं!' : 'Listen & Sing Along!'}
          </p>
        </div>

        <div className="flex justify-center items-end gap-1 mb-4 h-8">
          {audioLevels.map((level, index) => (
            <motion.div
              key={index}
              animate={{ height: `${Math.max(10, level)}%` }}
              transition={{ duration: 0.2 }}
              className="w-2 bg-gradient-to-t from-purple-400 to-pink-500 rounded-full"
              style={{ minHeight: '10%' }}
            />
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3">
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
            <span>{isPlaying ? (isHindiContent ? 'रोकें' : 'Pause') : (isHindiContent ? 'सुनें' : 'Play')}</span>
          </motion.button>

          {(poem.audioUrl && poem.audioUrlHindi) && (
            <motion.button
              onClick={switchLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg"
            >
              <Languages className="w-4 h-4" />
              <span>{currentLanguage === 'english' ? 'EN' : 'हिं'}</span>
            </motion.button>
          )}

          <motion.button
            onClick={toggleMute}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </motion.button>

          {poem.backgroundMusicUrl && (
            <div className="flex items-center gap-1 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm">
              <Music className="w-4 h-4" />
              <span>{isHindiContent ? 'संगीत' : 'BG Music'}</span>
            </div>
          )}
        </div>
      </motion.div>

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
