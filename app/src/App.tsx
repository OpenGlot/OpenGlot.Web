import { Route, Routes } from 'react-router-dom';
import MatchingPairs from './components/questions/MatchingPairs';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SignupConfirmPage from './pages/SignupConfirmPage';
import OAuthCallback from './components/auth/OAuthCallback';

function App() {
  return (
    <div className="App text-slate-800">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup-confirm" element={<SignupConfirmPage />} />
        <Route path="/questions" element={<MatchingPairs />} />
        <Route path="/oauth2/callback" element={<OAuthCallback />} />
      </Routes>
    </div>
  );
}

export default App;
