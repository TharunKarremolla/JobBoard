import { useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./Message.module.css";
import Cookies from 'js-cookie';
import axios from "axios";

export default function Message() {
    const [message,setMessage] = useState('')
    const location = useLocation();
    const { user } = location.state || {};
    

    const handleSend = async(receiver) => {
        try {
        await get_csrf();
        const csrfToken = Cookies.get('csrftoken')
        const res = await axios.post("http://127.0.0.1:8000/send_message/",{receiver,message},{
           withCredentials : true,
                    headers : {
                        "Content-Type" : "application/json",
                        "X-CSRFToken": csrfToken,
                    }
        } )
        
    }catch(error){
        console.log("errorrr : ",error)
    }}

     const get_csrf = async () => {
            try{
            const res = await axios.get('http://127.0.0.1:8000/csrf/',{
                withCredentials : true
            })
            Cookies.set("csrftoken", res.data.csrfToken);
        console.log("CSRF set:", res.data.csrfToken);
        
        }catch(error){
            console.log("csrf error" , error)

        }}

    return (
    <div className={styles.msgsDiv}>
        <h1>Messages</h1>
        {user ? (
            <>
            <h2>{user.username}</h2>
            <h2>{user.bio}</h2>
            </> ) : (
                <>
                <p>No user data</p>
                </>
            )
          }
          <input type="text" placeholder="send message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={() => handleSend(user.id)}>send</button>
    </div>
    )
}