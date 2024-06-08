import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../main.jsx";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { Link, Navigate } from 'react-router-dom';
import { FaPencilAlt, FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { RiLock2Fill } from 'react-icons/ri';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:3000/api/v1/user/register", { name, email, phone, password, role }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success(data.message);
            setName("");
            setEmail("");
            setPassword("");
            setPhone("");
            setRole("");
            setIsAuthorized(true);
            setUser(data.user);
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.messages);
        }
    };

    if (isAuthorized) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="authPage">
            <div className="container">
                <div className="header">
                    <img src="/JobZeelogo.png" alt="logo" />
                    <h3>Create a new Account</h3>
                </div>
                <form onSubmit={handleRegister}>
                    <div className='inputTag'>
                        <label>Register as</label>
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
                        <label>Name</label>
                        <div>
                            <input value={name} type='text' onChange={(e) => setName(e.target.value)} />
                            <FaPencilAlt />
                        </div>
                    </div>
                    <div className='inputTag'>
                        <label>Email</label>
                        <div>
                            <input value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
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
                    <div className='inputTag'>
                        <label>Phone</label>
                        <div>
                            <input value={phone} type="number" onChange={(e) => setPhone(e.target.value)} />
                            <FaPhoneFlip />
                        </div>
                    </div>
                    <button type='submit'>Register</button>
                    <Link to={"/login"}>Login</Link>
                </form>
            </div>
            <div className='banner'>
                <img src="/register.png" alt="register" />
            </div>
        </div>
    );
}

export default Register;
