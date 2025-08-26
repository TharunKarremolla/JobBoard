import { Link } from "react-router-dom"

export default function Main(){
    return (
        <div>
        <h1>Main page</h1>
        <p>New User <Link to ='/Account'>Create Account</Link> </p>
         <p>Existing User <Link to ='/Login'>Login</Link> </p>
        </div>
    )
}