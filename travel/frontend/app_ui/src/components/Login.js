import { useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"

axios.defaults.withCredentials = true; 

export default function Login({children}){
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const navigate = useNavigate();
    
    const handleLogin = async ()=>{
        get_csrf()
        const csrfToken =  Cookies.get('csrftoken')
        console.log(csrfToken)
        try {
                const res = await axios.post('http://127.0.0.1:8000/login/',{email, password},{
                    withCredentials : true,
                    headers : {
                        "Content-Type" : "application/json",
                        "X-CSRFToken": csrfToken,
                    }
                });
                console.log("Login successful");
                navigate("/Home")
            }
        catch(error){
            console.log("error : ",error)
        }
    }

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
        <div >
           {children}
           <div className={styles.container}>
                <h1>Login</h1>
                <input className={styles.inputs} type="text" placeholder="email or username" value={email}  onChange={(e) => setEmail(e.target.value) }/><br/>
                <input className={styles.inputs} type="password" placeholder="password"  value={password}  onChange={(e) => setPassword(e.target.value) } /><br></br>
                <button className = {styles.submitBtn} onClick={handleLogin}>Submit</button>
            </div>
        </div>
    )
}