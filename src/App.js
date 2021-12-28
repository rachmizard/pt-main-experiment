import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import Popup from "./components/Popup";
import Layout from "./components/Layout";
import LoginPage from "./pages/auth/login";
import CreateCoursePage from "./pages/course/create";
import HomePage from "./pages/home";

import AuthProvider from "./context/AuthContext";
import PopupProvider from "./context/PopupContext";

import useAuth from "./hooks/useAuth";
import CoursePage from "./pages/course";
import DetailCoursePage from "./pages/course/detail";

function App() {
  return (
    <PopupProvider>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/courses/:courseId" element={<DetailCoursePage />} />
            <Route path="/courses/create" element={<CreateCoursePage />} />
          </Route>
        </Routes>
        <Popup />
      </AuthProvider>
    </PopupProvider>
  );
}

const RequireAuth = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth?.auth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default App;
