import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import New_job from "./New_job";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Verify user session
  const checkUser = async () => {
    try {
      const res = await axios.get(
        "https://effective-guacamole-974wpj4v7grv2pjq-8000.app.github.dev/verify/",
        { withCredentials: true }
      );
      setUser(res.data);
    } catch (error) {
      console.log("Not authenticated:", error);
      navigate("/Login"); // redirect if not logged in
    }
  };

  useEffect(() => {
    checkUser();
  }, [navigate]);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  // Logout function
  const handleLogout = async () => {
    try {
           const res = await axios.post(
        "https://effective-guacamole-974wpj4v7grv2pjq-8000.app.github.dev/logout/",
        {},
        {
          withCredentials: true,
         
        }
      );

      console.log(res.data.message); // "Logged out successfully"
      navigate("/Login");
    } catch (error) {
      console.log("Logout error:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <New_job />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
