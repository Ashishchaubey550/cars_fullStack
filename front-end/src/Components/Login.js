import React, { useEffect } from 'react'
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const Navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth){
            Navigate("/")
        }else {

        }
    },[])
    const handleLogin= async(e)=>{
        console.warn(email , password)
        let result  = await fetch("http://localhost:8000/login",{
            method:"POST",
            body:JSON.stringify({email , password}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.name){
            localStorage.setItem("user",JSON.stringify(result));
            Navigate("/")
        }else{
            alert("please enter correct details");
        }
    }
    return (
        <>
        <div className="flex justify-center items-center flex-col m-[25px]">
        <h1 className="font-bold text-4xl">Log In</h1>
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
                onClick={handleLogin}
                className="m-[25px] p-[10px] w-[150px] bg-blue-300 border-black border-solid border-2">
                Log In
            </button>
        </div>


        </>
    )
}

export default Login