import { createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  ForgotPasswordPage,
  LoginPage,
  SignupPage,
  SignupConfirmPage,
  EnterUserInfoPage,
  VerifyPasswordResetPage,
  EnterNewPasswordPage,
  AccountPage,
  MyProfile,
  Settings,
  MyCourses,
  OAuthCallbackPage,
  ErrorBoundary,
} from "pages";
import { ProviderWrapper } from "context";
import {
  LanguageList,
  LanguageDetails,
  languagesLoader,
  languageLoader,
  ModuleList,
  ModuleDetails,
  modulesLoader,
  moduleLoader,
  CourseDetails,
  courseLoader,
  LessonList,
  LessonDetails,
  lessonsLoader,
  lessonLoader,
} from "features";
import { LanguageLearningGame, GameSelect } from "games";
import { ProtectedRoute } from "components";
import VoiceRecorder from "pages/VoiceRecorder";
import LessonForm from "features/lessons/LessonForm"; // Corrected import

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProviderWrapper />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/signup-confirm", element: <SignupConfirmPage /> },
      { path: "/oauth2/callback", element: <OAuthCallbackPage /> },
      { path: "/enter-info", element: <EnterUserInfoPage /> },
      { path: "/game", element: <GameSelect /> },
      { path: "/language-learning-game", element: <LanguageLearningGame /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/verify-password-reset", element: <VerifyPasswordResetPage /> },
      { path: "/reset-password", element: <EnterNewPasswordPage /> },
      { path: "/voice-recorder", element: <VoiceRecorder /> },
      {
        element: <ProtectedRoute />, // This wraps all protected routes
        children: [
          {
            path: "courses",
            element: <LanguageList />,
            loader: languagesLoader,
          },
          {
            path: "course/:id",
            element: <CourseDetails />,
            loader: courseLoader,
          },
          {
            path: "languages",
            element: <LanguageList />,
            loader: languagesLoader,
          },
          {
            path: "language/:id",
            element: <LanguageDetails />,
            loader: languageLoader,
          },
          { path: "modules", element: <ModuleList />, loader: modulesLoader },
          {
            path: "module/:id",
            element: <ModuleDetails />,
            loader: moduleLoader,
          },
          { path: "lessons", element: <LessonList />, loader: lessonsLoader },
          {
            path: "create-lesson/:id?",
            element: <LessonForm />,
            loader: lessonLoader,
          },
          {
            path: "lesson/:id",
            element: <LessonDetails />,
            loader: lessonLoader,
          },
          {
            path: "/account",
            element: <AccountPage />,
            children: [
              { path: "my-profile", element: <MyProfile /> },
              { path: "my-courses", element: <MyCourses /> },
              { path: "settings", element: <Settings /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
