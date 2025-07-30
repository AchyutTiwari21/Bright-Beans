import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PoemPage from './pages/PoemPage';
import AlphabetPage from './pages/AlphabetPage';
import MathGamePage from './pages/MathGamePage';
import HindiRhymesPage from './pages/HindiRhymesPage';
import HindiAlphabetPage from './pages/HindiAlphabetPage';
import StoryTellingPage from './pages/StoryTellingPage';
import PuzzleGamesPage from './pages/PuzzleGamesPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/poems" element={<PoemPage />} />
          <Route path="/alphabet" element={<AlphabetPage />} />
          <Route path="/math-games" element={<MathGamePage />} />
          <Route path="/hindi-rhymes" element={<HindiRhymesPage />} />
          <Route path="/hindi-alphabet" element={<HindiAlphabetPage />} />
          <Route path="/stories" element={<StoryTellingPage />} />
          <Route path="/puzzles" element={<PuzzleGamesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
