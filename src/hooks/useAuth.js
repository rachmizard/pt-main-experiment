import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/context/AuthContext";
import { AuthService } from "src/services/auth.service";

const authService = new AuthService();

export default function useAuth() {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const overrideAuth = JSON.parse(localStorage.getItem("__auth__"));
    if (overrideAuth) {
      auth.setAuth(overrideAuth);
    }
  }, []);

  const login = async ({ email = "", password = "" }) => {
    try {
      setLoading(true);
      const { data } = await authService.login(email, password);

      auth.setAuth(data);

      localStorage.setItem("__auth__", JSON.stringify(data));
    } catch (err) {
      setError(err.message);
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    auth.setAuth(null);
  };

  return {
    login,
    logout,
    loading,
    error,
    auth,
  };
}
