import React, { useState, useEffect } from 'react';
import nomad from '../assets/cyber_nomad.png';
import { authUser } from '../adapters/auth.js';

const Login = ({ setLoginIsOpen, updateLogin }) => {

    const userInitialState = {
        email: '',
        password: ''
    }

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(userInitialState);

    const updateUserData = (e) => {
        const { name, value} = e.target;
        setUser({ ... user, [name]: value});
    }

    // SENDS A REQUEST TO AUTHORIZE THE USER & GET A JWT TOKEN
    const response = async() => await authUser(user.email, user.password)
            .then( response => {
                
                //  STORING JWT TOKEN IN LOCALSTORAGE - THIS IS NOT TERRIBLY SECURE, AND WILL BE CHANGED LATER
                localStorage.setItem("access_token", response.data.access_token);
                localStorage.setItem("refresh_token", response.data.refresh_token);
                localStorage.setItem("username",response.data.username);
                localStorage.setItem("email",response.data.email);

                setUsername(response.data.username);
            });

    const handleSubmit = (e) => {
        e.preventDefault();
        response();

        updateLogin();
        document.querySelector("#login").reset();
        if(username != undefined) {
            handleClose();
        }
    }

    const handleClose = () => {
        setLoginIsOpen(false);
    }

    return (
        <div className="absolute top-0 left-0 z-10 w-full h-full bg-zinc-800/90">
            <div className="absolute w-1/4 h-3/5 left-1/3 top-36 bg-neutral-100 rounded-2xl">                
                <div className="flex items-center justify-center w-full h-full">
                    <button 
                        className="absolute w-8 h-8 rounded-full -top-4 -right-4 bg-neutral-100" 
                        onClick={ () => handleClose()}
                    >
                        x
                    </button>
                    <form id="login" className="w-2/3 h-3/4" onSubmit={handleSubmit}>
                        <fieldset className="flex flex-col items-center self-center">
                            <legend className="w-full mb-4 text-3xl text-center">Welcome Back</legend>
                            <img src={nomad} width={150} height={150} alt="nomad"
                                className="object-cover mb-8 rounded-full"></img>
                            <input 
                                type="email"
                                name="email"
                                value={user.email} 
                                onChange={updateUserData}
                                placeholder="Email" 
                                className="w-full h-8 pl-4 mb-2 rounded-full bg-neutral-200"></input>
                            <div className="flex flex-col w-full mb-4">
                                <input 
                                    type="password" 
                                    name="password"
                                    value={user.password}
                                    onChange={updateUserData}
                                    placeholder="Password" 
                                    className="w-full h-8 pl-4 rounded-full bg-neutral-200"></input>
                                <p className="self-end text-xs">Forgot Password?</p>
                            </div>
                            <div className="flex flex-col w-full">
                                <button type="submit" className="w-full h-8 bg-gray-900 rounded-full text-neutral-100">Login</button>
                                <p className="self-end text-xs">Don't have an account? Sign up</p>
                            </div>                       
                        </fieldset>
                    </form>
                </div>
                
            </div>
        </div>
    );
}

export default Login;