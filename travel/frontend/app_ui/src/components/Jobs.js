import { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import styles from "./Jobs.module.css";


export default function Jobs(){
    const [jobs,setJobs] = useState([])
    const fetch_jobs = async () =>{
        const res = await axios.get("http://127.0.0.1:8000/fetch_jobs")
        
        setJobs(res.data.jobs)
    }

    useEffect(() => {
 fetch_jobs();
    },[])   ;

    return (
        <div>
        <h1>All Jobs Posting </h1>
        
        <ul>
        {jobs.map(job => (

           <li key={job.id} className={styles.card}>
                <h3>{job.title}</h3>
                <p><b>Company</b> : {job.company}</p>
                <p>{job.description}</p>
                <p>Salary : ${job.salary}</p>
                <p>{job.loxation}</p>
            </li>
            
        ))}
        </ul>
        </div>
       
        
    )
}