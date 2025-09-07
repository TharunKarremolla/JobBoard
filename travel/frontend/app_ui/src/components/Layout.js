import axios from "axios";
import { useNavigate  } from "react-router-dom";
import styles from "./Layout.module.css"
import React from "react";
import logout from './logout.png'

export default function Layout( {children , user}){

    const navigate = useNavigate()
 const handleLogout = async () => {

    try {
           const res = await axios.post(
        "http://127.0.0.1:8000/logout/",
        {},
        {
          withCredentials: true,
         
        }
      );

      console.log(res.data.message); // "Logged out successfully"
      navigate("/Login");
    } catch (error) {
      console.log("Logout error:", error.response?.data || error.message);
    };
}


    return (
        <div>
          <nav className={styles.navbar}>
                <h1 className={styles.appname}>LinkedIn</h1>
                <div className={styles.logout}>
                <a onClick={handleLogout}><img src={logout}  width={15}/>Logout</a>
                </div>
               
            </nav>
          
            {React.cloneElement(children , {user})}
        </div>
    )
}