import { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import styles from "./New_job.module.css"

export default function New_Job(){
    const [Title,setTitle] = useState('')
    const [Company,setCompany] = useState('')
    const [Description,setDescription] = useState('')
    const [Salary,setSalary] = useState('')
    const [Location,setLocation] = useState('')
    const [Error,setError] = useState('')
    const navigate  = useNavigate()
   
    const Post_job = async () => {
        await get_csrf()
        const csrfToken =  Cookies.get('csrftoken')
        
        try{
            const res = await axios.post('http://127.0.0.1:8000/new_job/',{Title,Company,Description,Salary,Location},{
                withCredentials : true,
                headers : {
                    "Content-Type" : "application/json",
                     "X-CSRFToken": csrfToken,
                }
            })
            console.log("res",res.data)
            navigate("/Jobs")
    }catch(error){
        setError(error.response.data.message)

        console.log(Error)
    }}

    const get_csrf = async () => {
        try{
        const res = await axios.get("http://127.0.0.1:8000/csrf/",{
            withCredentials : true
        })
          Cookies.set("csrftoken", res.data.csrfToken);
    
    }catch(error){
        console.log("csrf error" , error)

    }}

    useEffect(() => {
        get_csrf();
    },[]);


    return (
        <div className={styles.container}>
            <h1>Post New Job</h1>
            <input className={styles.inputs} type="text" placeholder="Title" value={Title}  onChange={(e) => setTitle(e.target.value) }/><br/>
            <input className={styles.inputs} type="text" placeholder="Company"  value={Company}  onChange={(e) => setCompany(e.target.value) } /><br></br>
             <input className={styles.inputs} type="text" placeholder="Description" value={Description}  onChange={(e) => setDescription(e.target.value) }/><br/>
            <input className={styles.inputs} type="text" placeholder="Salary"  value={Salary}  onChange={(e) => setSalary(e.target.value) } /><br></br>
             <input className={styles.inputs} type="text" placeholder="Location" value={Location}  onChange={(e) => setLocation(e.target.value) }/><br/>
           {Error && <p className={styles.errors}>{Error}</p>}
            <button onClick={Post_job}>Post Job</button>
        </div>
    )
}