import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Music } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  description: string;
  content: string[];
  character: string;
  characterColor: string;
  theme: string;
  audioUrl?: string;
  backgroundMusicUrl?: string;
  duration: string;
  ageGroup: string;
  moral: string;
}

const StoryTellingPage = () => {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mainAudio, setMainAudio] = useState<HTMLAudioElement | null>(null);
  const [backgroundAudio, setBackgroundAudio] = useState<HTMLAudioElement | null>(null);
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [audioLevels, setAudioLevels] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  // const [voicesLoaded, setVoicesLoaded] = useState(false);

  const stories: Story[] = [
    {
      id: 'tortoise-hare',
      title: 'The Tortoise and the Hare',
      description: 'A classic tale about patience and perseverance',
      content: [
        'Once upon a time, in a beautiful meadow, there lived a speedy hare and a slow tortoise.',
        'The hare was very proud of his speed and often made fun of the tortoise.',
        '"You are so slow!" laughed the hare. "I can run circles around you!"',
        'The tortoise smiled calmly and said, "Would you like to have a race?"',
        'The hare agreed, thinking it would be easy to win.',
        'They started the race, and the hare quickly ran far ahead.',
        'Feeling confident, the hare decided to take a nap under a tree.',
        'Meanwhile, the tortoise kept moving slowly but steadily.',
        'When the hare woke up, he saw the tortoise near the finish line!',
        'The hare ran as fast as he could, but it was too late.',
        'The tortoise won the race! "Slow and steady wins the race," he said.'
      ],
      character: '🐢',
      characterColor: 'bg-gradient-to-br from-green-400 to-emerald-500',
      theme: 'bg-gradient-to-br from-green-100 to-emerald-100',
      audioUrl: '/assets/audio/tortoise_hare_story.mp3',
      backgroundMusicUrl: '/assets/audio/gentle_forest_music.mp3',
      duration: '5 min',
      ageGroup: '3-8 years',
      moral: 'Slow and steady wins the race'
    },
    {
      id: 'three-bears',
      title: 'Goldilocks and the Three Bears',
      description: 'A girl discovers a house in the woods',
      content: [
        'Once upon a time, there was a little girl named Goldilocks.',
        'She had beautiful golden hair that shone like the sun.',
        'One day, while walking in the forest, she found a cozy little house.',
        'The door was open, so she peeked inside. "Hello?" she called.',
        'No one answered, so she went in to explore.',
        'In the kitchen, she found three bowls of porridge.',
        'The first bowl was too hot, the second was too cold.',
        'But the third bowl was just right, so she ate it all up!',
        'Then she found three chairs in the living room.',
        'The first chair was too hard, the second was too soft.',
        'The third chair was just right, but it broke when she sat down!',
        'Feeling sleepy, she went upstairs and found three beds.',
        'Soon, the three bears came home and found their house disturbed.',
        'Goldilocks woke up, saw the bears, and ran home safely!'
      ],
      character: '🐻',
      characterColor: 'bg-gradient-to-br from-amber-400 to-orange-500',
      theme: 'bg-gradient-to-br from-amber-100 to-orange-100',
      audioUrl: '/assets/audio/goldilocks_story.mp3',
      backgroundMusicUrl: '/assets/audio/cozy_home_music.mp3',
      duration: '7 min',
      ageGroup: '4-9 years',
      moral: 'Always respect others\' property'
    },
    {
      id: 'little-red',
      title: 'Little Red Riding Hood',
      description: 'A girl visits her grandmother through the woods',
      content: [
        'Once upon a time, there was a sweet little girl who always wore a red hood.',
        'Everyone called her Little Red Riding Hood.',
        'One day, her mother asked her to take some treats to her sick grandmother.',
        '"Stay on the path and don\'t talk to strangers," her mother warned.',
        'Little Red Riding Hood promised and set off through the forest.',
        'On the way, she met a sly wolf who asked where she was going.',
        'She told him about visiting her grandmother.',
        'The wolf ran ahead to grandmother\'s house.',
        'When Little Red Riding Hood arrived, something seemed different.',
        '"Grandmother, what big eyes you have!" she said.',
        '"All the better to see you with," replied the wolf.',
        'Just then, a woodsman heard the commotion and came to help.',
        'He chased the wolf away and rescued grandmother.',
        'Little Red Riding Hood learned to always listen to her mother\'s advice.'
      ],
      character: '👧',
      characterColor: 'bg-gradient-to-br from-red-400 to-pink-500',
      theme: 'bg-gradient-to-br from-red-100 to-pink-100',
      audioUrl: '/assets/audio/little_red_story.mp3',
      backgroundMusicUrl: '/assets/audio/mysterious_forest_music.mp3',
      duration: '6 min',
      ageGroup: '5-10 years',
      moral: 'Listen to your parents and be careful with strangers'
    },
    {
      id: 'ugly-duckling',
      title: 'The Ugly Duckling',
      description: 'A story about finding where you belong',
      content: [
        'In a quiet pond, a mother duck was waiting for her eggs to hatch.',
        'One by one, cute little ducklings came out of their shells.',
        'But the last egg was bigger and took longer to hatch.',
        'When it finally opened, out came a gray, awkward duckling.',
        'The other ducklings laughed and called him ugly.',
        'The poor duckling felt very sad and lonely.',
        'He decided to leave and find where he belonged.',
        'He wandered through fields and forests, feeling unwanted.',
        'Winter came, and he struggled to find food and warmth.',
        'When spring arrived, he saw beautiful white birds on the lake.',
        'As he approached the water, he saw his reflection.',
        'He had grown into a magnificent swan!',
        'The other swans welcomed him warmly.',
        'He realized that being different made him special.'
      ],
      character: '🦢',
      characterColor: 'bg-gradient-to-br from-blue-400 to-cyan-500',
      theme: 'bg-gradient-to-br from-blue-100 to-cyan-100',
      audioUrl: '/assets/audio/ugly_duckling_story.mp3',
      backgroundMusicUrl: '/assets/audio/peaceful_lake_music.mp3',
      duration: '8 min',
      ageGroup: '4-10 years',
      moral: 'Everyone is special in their own way'
    }
  ];

  // Load voices when available
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

  // Audio visualization effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioLevels(prev => prev.map(() => Math.random() * 100));
      }, 150);
    } else {
      setAudioLevels([0, 0, 0, 0, 0, 0]);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Cleanup audio on unmount
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
  }, [mainAudio, backgroundAudio, speechUtterance]);

  const getCurrentStory = () => {
    return stories.find(story => story.id === selectedStory);
  };

  const getBestStorytellingVoice = () => {
    const voices = speechSynthesis.getVoices();
    
    // Look for high-quality storytelling voices
    const storytellingVoices = voices.filter(voice => 
      voice.lang.includes('en') || voice.lang.includes('EN')
    );
    
    // Prefer voices that sound good for storytelling
    const preferredVoices = storytellingVoices.filter(voice => 
      voice.name.toLowerCase().includes('samantha') ||
      voice.name.toLowerCase().includes('karen') ||
      voice.name.toLowerCase().includes('moira') ||
      voice.name.toLowerCase().includes('fiona') ||
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('woman') ||
      voice.name.toLowerCase().includes('natural') ||
      voice.name.toLowerCase().includes('premium') ||
      voice.name.toLowerCase().includes('enhanced')
    );
    
    return preferredVoices[0] || storytellingVoices[0] || voices[0];
  };

  const createStorytellingVoice = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Enhanced settings for storytelling
    utterance.rate = 0.65; // Slower for dramatic storytelling
    utterance.pitch = 1.1; // Slightly higher pitch for warmth
    utterance.volume = isMuted ? 0 : 0.9;
    utterance.lang = 'en-US';
    
    // Set the best available storytelling voice
    const bestVoice = getBestStorytellingVoice();
    if (bestVoice) {
      utterance.voice = bestVoice;
    }
    
    return utterance;
  };

  const handlePlayStory = async () => {
    const story = getCurrentStory();
    if (!story) return;

    try {
      if (isPlaying) {
        // Pause all audio
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

      // Play audio
      const audioUrl = story.audioUrl || `/assets/audio/${story.id}_story.mp3`;
      const bgMusicUrl = story.backgroundMusicUrl || '/assets/audio/story_bg_music.mp3';

      // Setup main audio
      if (mainAudio) {
        mainAudio.pause();
      }
      
      const newMainAudio = new Audio(audioUrl);
      newMainAudio.volume = isMuted ? 0 : 0.8;
      newMainAudio.onended = () => {
        setIsPlaying(false);
        if (backgroundAudio) {
          backgroundAudio.pause();
        }
      };
      newMainAudio.onerror = () => {
        // Fallback to enhanced speech synthesis with melodious voice
        console.log('Audio file not found, using enhanced speech synthesis');
        
        const utterance = createStorytellingVoice(story.content[currentPage]);
        
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

      // Setup background music
      if (bgMusicUrl) {
        const newBackgroundAudio = new Audio(bgMusicUrl);
        newBackgroundAudio.volume = isMuted ? 0 : 0.2; // Softer background music
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
        
        // Fallback to speech synthesis
        const utterance = createStorytellingVoice(story.content[currentPage]);
        
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
      mainAudio.volume = newMuted ? 0 : 0.8;
    }
    if (backgroundAudio) {
      backgroundAudio.volume = newMuted ? 0 : 0.2;
    }
    if (speechUtterance && speechSynthesis.speaking) {
      // For speech synthesis, we need to recreate the utterance with new volume
      speechSynthesis.cancel();
      if (!newMuted && isPlaying) {
        setTimeout(() => {
          const story = getCurrentStory();
          if (story) {
            const utterance = createStorytellingVoice(story.content[currentPage]);
            
            utterance.onend = () => {
              setIsPlaying(false);
              setSpeechUtterance(null);
            };
            
            setSpeechUtterance(utterance);
            speechSynthesis.speak(utterance);
          }
        }, 100);
      }
    }
  };

  const nextPage = () => {
    const story = getCurrentStory();
    if (story && currentPage < story.content.length - 1) {
      // Stop current audio when changing pages
      if (isPlaying) {
        if (mainAudio) mainAudio.pause();
        if (backgroundAudio) backgroundAudio.pause();
        if (speechUtterance) speechSynthesis.cancel();
        setIsPlaying(false);
      }
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      // Stop current audio when changing pages
      if (isPlaying) {
        if (mainAudio) mainAudio.pause();
        if (backgroundAudio) backgroundAudio.pause();
        if (speechUtterance) speechSynthesis.cancel();
        setIsPlaying(false);
      }
      setCurrentPage(currentPage - 1);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
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
              <BookOpen className="w-6 h-6 text-purple-500" />
              <h1 className="text-2xl font-bold text-purple-800">Story Time</h1>
              <BookOpen className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {!selectedStory ? (
            // Stories Grid
            <motion.div
              key="stories-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {stories.map((story) => (
                <motion.div
                  key={story.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedStory(story.id);
                    setCurrentPage(0);
                  }}
                  className={`${story.theme} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-white/50 backdrop-blur-sm`}
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
                      className={`w-20 h-20 ${story.characterColor} rounded-full flex items-center justify-center shadow-lg border-4 border-white mb-4 mx-auto`}
                    >
                      <span className="text-3xl">{story.character}</span>
                    </motion.div>

                    <h2 className="text-xl font-bold text-gray-800 mb-2">{story.title}</h2>
                    <p className="text-sm text-gray-600 mb-3">{story.description}</p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                      <span>⏱️ {story.duration}</span>
                      <span>👶 {story.ageGroup}</span>
                    </div>
                    
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-xs font-semibold text-purple-600">📖 Click to read</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Story Reader
            <motion.div
              key="story-reader"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-6">
                <motion.button
                  onClick={() => {
                    setSelectedStory(null);
                    setCurrentPage(0);
                    setIsPlaying(false);
                    if (mainAudio) mainAudio.pause();
                    if (backgroundAudio) backgroundAudio.pause();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Stories
                </motion.button>
              </div>

              {/* Story Content */}
              <div className={`${getCurrentStory()?.theme} rounded-3xl p-8 shadow-xl border-2 border-white/50 backdrop-blur-sm`}>
                {/* Story Header */}
                <div className="text-center mb-6">
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`w-24 h-24 ${getCurrentStory()?.characterColor} rounded-full flex items-center justify-center shadow-lg border-4 border-white mb-4 mx-auto`}
                  >
                    <span className="text-4xl">{getCurrentStory()?.character}</span>
                  </motion.div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{getCurrentStory()?.title}</h2>
                  <p className="text-gray-600">Page {currentPage + 1} of {getCurrentStory()?.content.length}</p>
                </div>

                {/* Audio Player */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border border-gray-200"
                >
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">🎧 Story Narrator</h3>
                    <p className="text-sm text-gray-600">Listen to the melodious storytelling</p>
                  </div>

                  {/* Audio Visualizer */}
                  <div className="flex justify-center items-end gap-1 mb-4 h-10">
                    {audioLevels.map((level, index) => (
                      <motion.div
                        key={index}
                        animate={{ height: `${Math.max(15, level)}%` }}
                        transition={{ duration: 0.15 }}
                        className="w-2 bg-gradient-to-t from-purple-400 to-pink-500 rounded-full"
                        style={{ minHeight: '15%' }}
                      />
                    ))}
                  </div>

                  {/* Audio Controls */}
                  <div className="flex flex-wrap justify-center items-center gap-3">
                    <motion.button
                      onClick={handlePlayStory}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                        isPlaying 
                          ? 'bg-red-500 hover:bg-red-600 text-white' 
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      <span>{isPlaying ? 'Pause' : 'Listen'}</span>
                    </motion.button>

                    <motion.button
                      onClick={toggleMute}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </motion.button>

                    {getCurrentStory()?.backgroundMusicUrl && (
                      <div className="flex items-center gap-1 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm">
                        <Music className="w-4 h-4" />
                        <span>Ambient Music</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Story Text */}
                <motion.div 
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/90 rounded-2xl p-8 mb-6 shadow-inner"
                >
                  <p className="text-xl leading-relaxed text-gray-700 font-medium text-center">
                    {getCurrentStory()?.content[currentPage]}
                  </p>
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <motion.button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    whileHover={{ scale: currentPage === 0 ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === 0 ? 1 : 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      currentPage === 0 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                    }`}
                  >
                    <SkipBack className="w-4 h-4" />
                    Previous
                  </motion.button>

                  <div className="text-center">
                    <div className="flex gap-2">
                      {getCurrentStory()?.content.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentPage ? 'bg-purple-500' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <motion.button
                    onClick={nextPage}
                    disabled={currentPage === (getCurrentStory()?.content.length || 1) - 1}
                    whileHover={{ scale: currentPage === (getCurrentStory()?.content.length || 1) - 1 ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === (getCurrentStory()?.content.length || 1) - 1 ? 1 : 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      currentPage === (getCurrentStory()?.content.length || 1) - 1
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                    }`}
                  >
                    Next
                    <SkipForward className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Story Moral */}
                {currentPage === (getCurrentStory()?.content.length || 1) - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-xl"
                  >
                    <h4 className="font-bold text-yellow-800 mb-2">📚 Story Moral:</h4>
                    <p className="text-yellow-700">{getCurrentStory()?.moral}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default StoryTellingPage;
