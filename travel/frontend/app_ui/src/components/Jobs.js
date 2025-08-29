import { useState, useEffect } from "react";
import axios from 'axios';
import styles from "./Jobs.module.css";
import Cookies from 'js-cookie';

export default function Jobs(){
    const [jobs,setJobs] = useState([])
    const fetch_jobs = async () =>{
        const res = await axios.get("http://127.0.0.1:8000/fetch_jobs")
        
        setJobs(res.data.jobs)
    }

    useEffect(() => {
 fetch_jobs();
    },[])   ;

    const applyForJobs = async(jobId) => {

        try{
        getCSRFToken();
        const csrfToken = Cookies.get("csrftoken")
        const res = await axios.post('http://127.0.0.1:8000/apply',{jobId},{
            withCredentials : true,
            headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken, // if using Django session auth
        },
        })
        console.log(res.data)
    }catch(error){
        console.log("error occurred : ",error)
    }
    }
    const getCSRFToken = async()=>{

        try {
        const res = await axios.get('http://127.0.0.1:8000/csrf/')
        Cookies.set("csrftoken",res.data.csrfToken)
        console.log("csrf : " , res.data)
    }catch(error){
        console.log(error)
    }
}


    return (
        <div className={styles.jobsDiv}>
        <h1>All Jobs Posting </h1>
        
        <ul>
        {jobs.map(job => (

           <li key={job.id} className={styles.card}>
                <h3>{job.title}</h3>
                <p><b>Company</b> : {job.company}</p>
                <p>{job.description}</p>
                <p>Salary : ${job.salary}</p>
                <p>{job.loxation}</p>
              <button className={styles.applyBtn} onClick={applyForJobs}>Apply</button>
            </li>
        ))
        }
        </ul>
        </div>
       
        
    )
}