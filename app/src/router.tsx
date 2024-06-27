import { createBrowserRouter } from "react-router-dom";
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage/LoginPage";
import SignupPage from "pages/SignupPage";
import SignupConfirmPage from "pages/SignupConfirmPage";
import OAuthCallbackPage from "pages/OAuthCallbackPage";
import AccountPage from "pages/AccountPage/AccountPage";
import MyProfile from "pages/AccountPage/MyProfile";
import Settings from "pages/AccountPage/Settings";
import MyCourses from "pages/AccountPage/MyCourses";
import EnterUserInfoPage from "pages/EnterUserInfoPage";
import ForgotPasswordPage from "pages/ForgotPasswordPage";
import VerifyPasswordResetPage from "pages/VerifyPasswordResetPage";
import EnterNewPasswordPage from "pages/EnterNewPasswordPage";
import ErrorBoundary from "pages/ErrorBoundry";
import ProviderWrapper from "context/ProviderWrapper";
import LanguageList from "features/languages/LanguageList";
import LanguageDetail from "features/languages/LanguageDetails";
import { languagesLoader } from "features/languages/LanguagesLoader";
import { languageLoader } from "features/languages/LanguageLoader";
import ModuleList from "features/modules/ModuleList";
import ModuleDetail from "features/modules/ModuleDetails";
import { modulesLoader } from "features/modules/ModulesLoader";
import { moduleLoader } from "features/modules/ModuleLoader";
import CourseList from "features/courses/CourseList";
import CourseDetail from "features/courses/CourseDetails";
import { coursesLoader } from "features/courses/CoursesLoader";
import { courseLoader } from "features/courses/CourseLoader";
import LessonList from "features/lessons/LessonList";
import LessonDetail from "features/lessons/LessonDetails";
import { lessonsLoader } from "features/lessons/LessonsLoader";
import { lessonLoader } from "features/lessons/LessonLoader";
import LanguageLearningGame from "games/LanguageLearningGame";
import ProtectedRoute from "components/common/ProtectedRoute";

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
      { path: "/game", element: <LanguageLearningGame /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/verify-password-reset", element: <VerifyPasswordResetPage /> },
      { path: "/reset-password", element: <EnterNewPasswordPage /> },
      {
        element: <ProtectedRoute />, // This wraps all protected routes
        children: [
          { path: "courses", element: <CourseList />, loader: coursesLoader },
          {
            path: "course/:id",
            element: <CourseDetail />,
            loader: courseLoader,
          },
          {
            path: "languages",
            element: <LanguageList />,
            loader: languagesLoader,
          },
          {
            path: "language/:id",
            element: <LanguageDetail />,
            loader: languageLoader,
          },
          { path: "modules", element: <ModuleList />, loader: modulesLoader },
          {
            path: "module/:id",
            element: <ModuleDetail />,
            loader: moduleLoader,
          },
          { path: "lessons", element: <LessonList />, loader: lessonsLoader },
          {
            path: "lesson/:id",
            element: <LessonDetail />,
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
