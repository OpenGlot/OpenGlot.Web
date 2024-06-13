import { Route, Routes } from "react-router-dom";
import MatchingPairs from "./components/questions/MatchingPairs";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage";
import SignupConfirmPage from "./pages/SignupConfirmPage";
import OAuthCallback from "./components/auth/OAuthCallback";
import AccountPage from "./pages/AccountPage/AccountPage";
import MyProfile from "./pages/AccountPage/MyProfile";
import Settings from "./pages/AccountPage/Settings";
import MyCourses from "./pages/AccountPage/MyCourses";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="App text-slate-700 dark:text-gray-100 dark:bg-customBlack">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup-confirm" element={<SignupConfirmPage />} />
          <Route path="/questions" element={<MatchingPairs />} />
          <Route path="/oauth2/callback" element={<OAuthCallback />} />
          <Route path="account" element={<AccountPage />}>
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
