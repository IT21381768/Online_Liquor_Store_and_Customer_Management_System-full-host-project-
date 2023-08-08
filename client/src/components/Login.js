import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/login", { email, password })
            .then(result => {
                console.log(result);
                if (result.data === "Login Success") {
                    Swal.fire({
                        title: 'Login Success!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        this.setState({
                            name: "",
                            email: "",
                            message: ""
                        });
                    });
                    navigate("/home");
                } else if (result.data === "Password didn't match") {
                    console.log("Password is incorrect");
                    Swal.fire({
                        title: 'Password is incorrect',
                        icon: 'warning',
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        this.setState({
                            name: "",
                            email: "",
                            message: ""
                        });
                    });
                } else if (result.data === "User not registered") {
                    console.log("User is not registered");
                    Swal.fire({
                        title: 'User is not registered',
                        icon: 'warning',
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        this.setState({
                            name: "",
                            email: "",
                            message: ""
                        });
                    });
                }
            })
            .catch(err => console.log(err));
    };


    return (
        <div className="container">

            <form className="create" onSubmit={handleSubmit}>
                <h3>User Login</h3>

                <label>
                    Email
                </label>
                <input type="email"
                    autoComplete="off"
                    name="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    required />

                <label >
                    Password
                </label>
                <input
                    type="password"
                    autoComplete="off"
                    name="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    required />

                <center>
                    <button type="submit" className="formBtn">
                        Login
                    </button>
                </center>
            </form>
        </div>
    )
}

export default Login