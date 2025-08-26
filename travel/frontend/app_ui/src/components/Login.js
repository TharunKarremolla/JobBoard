import { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


axios.defaults.withCredentials = true; 

export default function Login(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const navigate = useNavigate();
    
    const handleLogin = async ()=>{
        get_csrf()
        const csrfToken =  Cookies.get('csrftoken')
        console.log(csrfToken)
        try {
                const res = await axios.post('https://effective-guacamole-974wpj4v7grv2pjq-8000.app.github.dev/login/',{email, password},{
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
            const res = await axios.get('https://effective-guacamole-974wpj4v7grv2pjq-8000.app.github.dev/csrf/',{
                withCredentials : true
            })
            Cookies.set("csrftoken", res.data.csrfToken);
        console.log("CSRF set:", res.data.csrfToken);
        
        }catch(error){
            console.log("csrf error" , error)

        }}


    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="email" value={email}  onChange={(e) => setEmail(e.target.value) }/><br/>
            <input type="password" placeholder="password"  value={password}  onChange={(e) => setPassword(e.target.value) } /><br></br>
            <button onClick={handleLogin}>Submit</button>
        </div>
    )
}