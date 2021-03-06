import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import Popup from "./components/Popup";
import AppProvider from "./context/AppContext";
import useAuth from "./hooks/useAuth";
import LoginPage from "./pages/auth/login";
import CartPage from "./pages/cart";
import CoursePage from "./pages/course";
import CreateCoursePage from "./pages/course/create";
import DetailCoursePage from "./pages/course/detail";
import HomePage from "./pages/home";
import OrderPage from "./pages/order";

function App() {
     return (
          <AppProvider>
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
                         <Route
                              path="/courses/:courseId"
                              element={<DetailCoursePage />}
                         />
                         <Route
                              path="/courses/create"
                              element={<CreateCoursePage />}
                         />
                         <Route path="/cart" element={<CartPage />} />
                         <Route path="/orders" element={<OrderPage />} />
                    </Route>
               </Routes>
               <Popup />
          </AppProvider>
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
