import { useContext, useState } from "react";
import { AuthContext } from "src/context/AuthContext";
import { AuthService } from "src/services/auth.service";

export default function useAuth() {
     const authService = new AuthService();

     const auth = useContext(AuthContext);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);

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

     const flushSyncProfile = async () => {
          try {
               const { data } = await authService.getProfile();

               auth.setAuth({ ...auth.auth, user: data.data });

               localStorage.setItem(
                    "__auth__",
                    JSON.stringify({ ...auth.auth, user: data.data })
               );
          } catch (error) {
               setError(error.message);
               throw new Error(error);
          }
     };

     const logout = () => {
          localStorage.clear();
          auth.setAuth(null);
          window.location.reload();
     };

     return {
          login,
          logout,
          loading,
          error,
          auth,
          flushSyncProfile,
     };
}
