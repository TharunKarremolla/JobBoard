import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styles

export default function Main(){
    
    return (
        <div>
             <h1 className={styles.header}>LinkedIn</h1>
        <h1>Welcome to LinkedIn</h1>
        <p>New User ? <Link to ='/Account'>Create Account</Link> </p>
         <p>Existing User ? <Link to ='/Login'>Login</Link> </p>
        </div>
    )
}