import React, { useState, useEffect } from 'react';
import nomad from '../assets/cyber_nomad.png';
import { authUser } from './auth.js';
import authToken from './authToken.js';

const Login = ({ setLoginIsOpen, updateLogin }) => {

    const userInitialState = {
        email: '',
        password: ''
    }

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(userInitialState);
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

    const testEmail = "testuseremail@testuser.com";
    const testPassword = "testuserpassword";

    const updateUserData = (e) => {
        const { name, value} = e.target;
        setUser({ ... user, [name]: value});
    }

    // SENDS A REQUEST TO AUTHORIZE THE USER & GET A JWT TOKEN
    const response = async() => await authUser(user.email, user.password)
            .then( response => {
                setUsername(response.data.username);
                setAccessToken(response.data.access_token);
                setRefreshToken(response.data.refresh_token);
                //  STORING JWT TOKEN IN LOCALSTORAGE - THIS IS NOT TERRIBLY SECURE, AND WILL BE CHANGED LATER
                localStorage.setItem("access_token", response.data.access_token);
                localStorage.setItem("refresh_token", response.data.refresh_token);
                localStorage.setItem("username",response.data.username)
                authToken(accessToken);
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
        <div className="h-full w-full absolute top-0 left-0 bg-zinc-800/90 z-10">
            <div className="h-3/5 w-1/4 absolute left-1/3 top-36 bg-neutral-100 rounded-2xl">                
                <div className="flex justify-center items-center h-full w-full">
                    <button 
                        className="h-8 w-8 absolute -top-4 -right-4 bg-neutral-100 rounded-full" 
                        onClick={ () => handleClose()}
                    >
                        x
                    </button>
                    <form id="login" className="h-3/4 w-2/3" onSubmit={handleSubmit}>
                        <fieldset className="flex flex-col self-center items-center">
                            <legend className="w-full mb-4 text-center text-3xl">Welcome Back</legend>
                            <img src={nomad} width={150} height={150} alt="nomad"
                                className="object-cover rounded-full mb-8"></img>
                            <input 
                                type="text"
                                name="email"
                                value={user.email} 
                                onChange={updateUserData}
                                placeholder="Email" 
                                className="w-full h-8 pl-4 mb-2 bg-neutral-200 rounded-full"></input>
                            <div className="flex flex-col w-full mb-4">
                                <input 
                                    type="text" 
                                    name="password"
                                    value={user.password}
                                    onChange={updateUserData}
                                    placeholder="Password" 
                                    className="w-full h-8 pl-4 bg-neutral-200 rounded-full"></input>
                                <p className="self-end text-xs">Forgot Password?</p>
                            </div>
                            <div className="flex flex-col w-full">
                                <button type="submit" className="w-full h-8 bg-gray-900 text-neutral-100 rounded-full">Login</button>
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