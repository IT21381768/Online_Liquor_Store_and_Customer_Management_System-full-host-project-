import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3000/register", { name, email, password })
            .then(result => {
                console.log(result)
                navigate("/login")
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
            <h3>User Register</h3>
                
                    <label> Name</label>
                    <input type="text"
                        autoComplete="off"
                        name="name"
                        placeholder="Enter your name"
                        onChange={(e) => setName(e.target.value)} />
               
                    <label>Email</label>
                    <input type="email"
                        autoComplete="off"
                        name="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)} />
            
                    <label>Password</label>
                    <input type="password"
                        autoComplete="off"
                        name="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)} />
              
              <center>
                <button type="submit" className="formBtn">
                    Register
                </button>
                </center>
            </form>
            <center>
            <p>Already have a account:</p>
            <a href="/login">
            <button type="submit" className="formBtn">
                    Login
                </button></a>
            </center>


        </div>

      
    )
}

export default Signup
