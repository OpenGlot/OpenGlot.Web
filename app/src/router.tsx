import { createBrowserRouter } from "react-router-dom";
import MatchingPairs from "./components/questions/MatchingPairs";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage";
import SignupConfirmPage from "./pages/SignupConfirmPage";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import MyProfile from "./pages/AccountPage/MyProfile";
import Settings from "./pages/AccountPage/Settings";
import MyCourses from "./pages/AccountPage/MyCourses";
import EnterUserInfoPage from "./pages/EnterUserInfoPage";
import ProviderWrapper from "./context/ProviderWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProviderWrapper />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/signup-confirm", element: <SignupConfirmPage /> },
      { path: "/questions", element: <MatchingPairs /> },
      { path: "/oauth2/callback", element: <OAuthCallbackPage /> },
      { path: "/enter-info", element: <EnterUserInfoPage /> },
      {
        path: "account",
        element: <AccountPage />,
        children: [
          { path: "my-profile", element: <MyProfile /> },
          { path: "my-courses", element: <MyCourses /> },
          { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },
]);

export default router;
