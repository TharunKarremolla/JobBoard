import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(
          "https://effective-guacamole-974wpj4v7grv2pjq-8000.app.github.dev/verify/",
          { withCredentials: true }
        );

        if (res.data.authenticated) {
          setIsAuth(true);
          console.log("Verify response:", res.status, res.data);

        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false); // 401 or network error → not authenticated
      }
    };

    verifyUser();
  }, []);

  if (isAuth === null) {
    return <h2>Checking authentication...</h2>; // loading screen
  }

  return isAuth ? children : <Navigate to="/Login" replace />;
}
