import { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true; 

export default function Account(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [is_recruiter,setRecruiter] = useState(false)
 
    
    const navigate = useNavigate();
    

    const handSubmit = async () => {
        await get_csrf()
        const csrfToken = await Cookies.get('csrftoken')
        console.log(csrfToken)

        try {
        const res = await axios.post("http://127.0.0.1:8000/create_acc/",
            {username,email,password,is_recruiter},
            {
                withCredentials : true,
                headers : {
                    "Content-Type" : "application/json",
                     "X-CSRFToken": csrfToken,

                }
            }
        )
        navigate("/Login")

    }
    catch(error){
        console.log("error occurred : ",error)
    }
    }

    const get_csrf = async () => {
        try{
        const res = await axios.get("http://127.0.0.1:8000/csrf/",{
            withCredentials : true
        })
          Cookies.set("csrftoken", res.data.csrfToken);
    console.log("CSRF set:", res.data.csrfToken);
    }catch(error){
        console.log("csrf error" , error)

    }}

    useEffect(() => {
        get_csrf();
    },[]);

    return (
        <div>
        <h1>Create Account</h1>
        <input type="text" placeholder="username" value={username}  onChange={(e) => setUsername(e.target.value) }/><br/>
        <input type="email" placeholder="email" value={email}  onChange={(e) => setEmail(e.target.value) } /><br></br>
        <input type="password" placeholder="password"  value={password}  onChange={(e) => setPassword(e.target.value) } /><br></br>
        <label>Recruiter</label><input type="checkbox"  onClick={(e) =>setRecruiter(e.target.checked) }></input><br></br>
        <button onClick={handSubmit}>Submit</button>
       
        </div>
    )
}