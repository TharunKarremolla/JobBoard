import { useEffect, useState } from "react"
import axios from "axios"
import styles from './Inbox.module.css';
import { Link } from "react-router-dom";

export default function Inbox(){
    const [search,setSearch] = useState('')
    const [users,setUsers] = useState([])
    

    const fetch_users = async() => {
        const res = await axios.get("http://127.0.0.1:8000/all_users/")
        
        setUsers(res.data.users)
    }
    useEffect(() => {
        fetch_users();
    },[]);

    return (
        <div className={styles.inboxDiv}>
            <h1>Messages</h1>
           <input type="search" placeholder="search..." value={search} onChange={(e) => setSearch(e.target.value)}></input>
           <ul>
           {users.map((user) => (
            <Link className={styles.links} to='/Message' state={{ user }}><li key={user.id}>{user.username.toUpperCase()}</li></Link>
          ) )}
           </ul>
            
        </div>
    )
}