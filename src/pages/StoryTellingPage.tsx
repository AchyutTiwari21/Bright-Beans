import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

const StoryTellingPage = () => {
  const stories = [
    {
      title: "The Little Red Hen",
      pages: [
        "Once upon a time, there was a little red hen who lived on a farm with her friends: a lazy cat, a sleepy dog, and a noisy duck.",
        "One day, the little red hen found some grains of wheat. 'Who will help me plant this wheat?' she asked.",
        "'Not I,' said the cat. 'Not I,' said the dog. 'Not I,' said the duck.",
        "So the little red hen planted the wheat all by herself. Soon it grew tall and golden.",
        "'Who will help me cut the wheat?' asked the hen. But again, no one wanted to help.",
        "The hen cut the wheat, ground it into flour, and baked delicious bread all by herself.",
        "When the bread was ready, everyone wanted to eat it! But the wise little hen said, 'Only those who help with the work get to enjoy the reward!'",
        "From that day on, all the animals learned the importance of helping each other. The End! 🌟"
      ],
      theme: "bg-gradient-to-br from-red-100 to-yellow-100"
    },
    {
      title: "The Tortoise and the Hare",
      pages: [
        "In a peaceful meadow lived a speedy hare and a slow tortoise. The hare was very proud of how fast he could run.",
        "One day, the hare laughed at the tortoise. 'You're so slow! I bet I could beat you in a race!'",
        "The tortoise smiled calmly and said, 'I accept your challenge. Let's race to the big oak tree.'",
        "The race began! The hare zoomed ahead quickly, leaving the tortoise far behind.",
        "Feeling confident, the hare decided to take a nap under a shady tree. 'I have plenty of time,' he thought.",
        "Meanwhile, the tortoise kept moving slowly but steadily, step by step, never stopping.",
        "When the hare woke up, he saw the tortoise near the finish line! He ran as fast as he could, but it was too late.",
        "The tortoise won the race! 'Slow and steady wins the race,' he said with a gentle smile. The End! 🐢"
      ],
      theme: "bg-gradient-to-br from-green-100 to-blue-100"
    },
    {
      title: "The Three Little Pigs",
      pages: [
        "Once there were three little pigs who decided to build their own houses.",
        "The first pig built his house with straw. It was quick and easy, but not very strong.",
        "The second pig built his house with sticks. It was a bit stronger than straw, but still not very sturdy.",
        "The third pig worked hard all day building his house with strong bricks.",
        "Soon, a big bad wolf came along. He huffed and puffed and blew down the straw house!",
        "The wolf then blew down the stick house too! Both pigs ran to their brother's brick house.",
        "The wolf huffed and puffed, but he couldn't blow down the brick house. It was too strong!",
        "The three pigs were safe inside. They learned that hard work and planning ahead keeps you safe. The End! 🏠"
      ],
      theme: "bg-gradient-to-br from-pink-100 to-purple-100"
    }
  ];

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const currentStory = stories[currentStoryIndex];
  const currentPage = currentStory.pages[currentPageIndex];

  const nextPage = () => {
    if (currentPageIndex < currentStory.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const selectStory = (index: number) => {
    setCurrentStoryIndex(index);
    setCurrentPageIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-10">
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
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Story Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">Choose a Story</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {stories.map((story, index) => (
              <button
                key={index}
                onClick={() => selectStory(index)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentStoryIndex === index
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-white/80 text-purple-700 hover:bg-purple-100'
                }`}
              >
                {story.title}
              </button>
            ))}
          </div>
        </div>

        {/* Story Book */}
        <div className="max-w-4xl mx-auto">
          <div className={`${currentStory.theme} rounded-3xl p-8 md:p-12 shadow-2xl`}>
            {/* Story Title */}
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
              {currentStory.title}
            </h3>

            {/* Page Content */}
            <div className="bg-white/90 rounded-2xl p-8 md:p-12 min-h-[300px] flex items-center justify-center">
              <p className="text-xl leading-relaxed text-gray-700 text-center max-w-2xl">
                {currentPage}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevPage}
                disabled={currentPageIndex === 0}
                className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                <span className="text-purple-700 font-semibold">
                  Page {currentPageIndex + 1} of {currentStory.pages.length}
                </span>
              </div>

              <button
                onClick={nextPage}
                disabled={currentPageIndex === currentStory.pages.length - 1}
                className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-600 transition-colors"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Page Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {currentStory.pages.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentPageIndex ? 'bg-purple-500' : 'bg-purple-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Reading Tips */}
        <div className="mt-12 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">Reading Tips! 📚</h3>
            <p className="text-gray-700 text-lg mb-4">
              Take your time reading each page. Stories teach us important lessons!
            </p>
            <p className="text-gray-600">
              Can you guess what will happen next? Use your imagination! ✨
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StoryTellingPage;
