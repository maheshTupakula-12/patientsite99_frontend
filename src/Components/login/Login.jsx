// Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });


    const handleChange_login = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        // Add authentication logic here (e.g., API call to backend)

        console.log(loginData); // Example: Print form data
        fetch("https://doctorsite-backend.onrender.com/pat/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email: loginData.email,
                password: loginData.password
            }),
            credentials:"include"
        }).then((response)=>{
            if(response.status === 401){
                throw new Error("Invalid Password")
            }
            if(response.status === 404)
                throw new Error("user not found")
            return response.text()
        })
        .then((data)=>{
            console.log(data)
            localStorage.setItem("email",loginData.email)
            toast.success("successfully logged in")
            navigate("/main")
        }).catch(err=>{
            toast.error("login failed")
            console.log(err)
        })
    };

    return (
        <div className="login" style={{
            backgroundColor: '#f0f4f8'
        }}>
            <div className="login-container" style={{
                padding: '40px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                maxWidth: '400px',
                width: '100%',
                textAlign: 'center',
                border: '1px solid #ddd'
            }}>
                <h2
                    style={{
                        marginBottom: '20px',
                        fontSize: '28px',
                        fontWeight: '600',
                        color: '#333',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }}
                    onClick={() => { document.getElementById("email").focus(); }}
                >
                    Login
                </h2>
            
                <form className="login_form" onSubmit={handleSubmitLogin} style={{width:"340px", display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange_login}
                        required
                        style={{
                            padding: '12px 15px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            fontSize: '16px',
                            width: '80%',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            outline: 'none',
                            transition: 'border-color 0.3s'
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange_login}
                        required
                        style={{
                            padding: '12px 15px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            fontSize: '16px',
                            width: '80%',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            outline: 'none',
                            transition: 'border-color 0.3s'
                        }}
                    />
                    <motion.button
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        type="submit"
                        className="submit_login"
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#007bff',
                            color: '#ffffff',
                            fontSize: '16px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s, transform 0.3s',
                            width: '50%'
                        }}
                    >
                        Login
                    </motion.button>
                </form>
            </div>
        </div>
        
    );
};

export default Login;
