import React, { useContext, useState } from 'react';
import { Context } from "../../main.jsx";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from 'react-icons/ri';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();


    const { isAuthorized, setIsAuthorized, setEemail, setUser } = useContext(Context);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:3000/api/v1/user/login", { email, password, role }, {
                withCredentials: true,
            });
            toast.success(data.message.message);
            setEmail("");
            setPassword("");
            setRole("");
            setIsAuthorized(true);
            navigate("/")
            setUser(data.user);
            setEemail(email)
        } catch (error) {
            toast.error(error.response.data.messages);
        }
    };

    if (isAuthorized) {
        return <Navigate to={"/"} />
    }
    return (
        <div className="authPage">
            <div className="container">
                <div className="header">
                    <img src="/JobZeelogo.png" alt="logo" />
                    <h3>Login Here..!</h3>
                </div>
                <form onSubmit={handleLogin}>
                    <div className='inputTag'>
                        <label>Login as</label>
                        <div>
                            <select value={role} onChange={(e) => setRole(e.target.value)} >
                                <option value="">Select Role</option>
                                <option value="Employer">Employer</option>
                                <option value="Job seeker">Job seeker</option>
                            </select>
                            <FaRegUser />
                        </div>
                    </div>
                    <div className='inputTag'>
                        <label>Email</label>
                        <div>
                            <input value={email} id='Email' type='email' onChange={(e) => setEmail(e.target.value)} />
                            <MdOutlineMailOutline />
                        </div>
                    </div>
                    <div className='inputTag'>
                        <label>Password</label>
                        <div>
                            <input value={password} type='password' onChange={(e) => setPassword(e.target.value)} />
                            <RiLock2Fill />
                        </div>
                    </div>
                    <button type='submit'>Login</button>
                    <Link to={"/register"}>Register</Link>
                </form>
            </div>
            <div className='banner'>
                <img src="/login.png" alt="login" />
            </div>
        </div>
    );
}

export default Login;
