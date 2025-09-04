import { useState, useEffect } from "react";
import home from "./home.png";
import suitcase from './suitcase.png';
import { Link } from "react-router-dom";
import styles from './Home.module.css';
import add from "./add.png";
import profile from "./profile.png";
import chat from "./chat.png";


export default function Home( {user}) {
  
console.log("username : ", user)
  if (!user) {
    return <h1>Loading...</h1>;
  }


  return (
    <div className={styles.home_page}>
      <div className={styles.centered}>
        <h1>Welcome {user}!</h1>
        <div className={styles.links}>
          <Link to="/home"><img src={home} alt="home icon" width="30" /></Link>
          <Link to="/Jobs"><img src={suitcase} alt="home icon" width="30" /></Link>       
          <Link to="/New_job"><img src={add} alt="home icon" width="30" /></Link>  
          <Link to="/Profile"><img src={profile} alt="home icon" width="30" /></Link>  
          <Link to='/Inbox' ><img src={chat} alt="Inbox icon" width={30} /></Link>
          
          
        </div>
        
        
        </div>
    </div>
  );
}
