import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import AuthContextProvider from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";

const App = () => {
  const RequireAuth = ({ children }) => {
    let location = useLocation();
    const { isAuthenticated } = useContext(AuthContext);
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
  };

  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/product/:productId"
            element={
              <RequireAuth>
                <ProductPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
