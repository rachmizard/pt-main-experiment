import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import AuthProvider from "./context/AuthContext";
import useAuth from "./hooks/useAuth";
import LoginPage from "./pages/auth/login";
import CreateCoursePage from "./pages/course/create";
import HomePage from "./pages/home";

function App() {
  return (
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
          <Route path="/courses/create" element={<CreateCoursePage />} />
        </Route>
      </Routes>
    </AuthProvider>
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
