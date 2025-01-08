import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useEffect } from 'react';

const Signup = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const Navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            Navigate('/')
        }
    })

    const collectData = async (e) => {
        e.preventDefault();
        
        // Basic client-side validation
        if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        console.log(name, password, email);

        let result = await fetch("https://cars-fullstack.onrender.com/register", {
            method: 'POST',
            body: JSON.stringify({ name, password, email }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        result = await result.json();

        localStorage.setItem("user", JSON.stringify(result));
 
        if (result && result.message === "User registered successfully") {
            // Navigate to home page upon successful registration
            navigate('/');
        } else {
            // Handle error (e.g., email already registered)
            alert(result.error || "email already registered.");
        }

    };

    return (
        <>
            <div className="flex justify-center items-center flex-col m-[25px]">
                <h1 className="font-bold text-4xl">Register</h1>
                <input
                    className="block m-[25px] p-2 w-[300px] border-solid border-blue-400 border-[1px]"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Enter Name"
                />
                <input
                    className="block m-[25px] p-2 w-[300px] border-solid border-blue-400 border-[1px]"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"  // Use email type for better validation
                    placeholder="Enter Email"
                />
                <input
                    className="block m-[25px] p-2 w-[300px] border-solid border-blue-400 border-[1px]"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Enter Password"
                />
                <button
                    onClick={collectData}
                    className="m-[25px] p-[10px] w-[150px] bg-blue-300 border-black border-solid border-2"
                >
                    Sign Up
                </button>
            </div>
        </>
    );
};

export default Signup;
