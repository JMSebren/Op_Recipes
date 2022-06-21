import React, { useState,useEffect } from 'react'; 
import nomad from '../assets/cyber_nomad.png';
import { register } from './auth.js';

const SignUp = ({ setSignUpIsOpen }) => {

    const userInitialState = {
        username: '',
        email: '',
        password: ''
    }

    const [user, setUser] = useState(userInitialState);

    const updateUserData = (e) => {
        const { name, value} = e.target;
        setUser({ ... user, [name]: value});
    }

    const response = async () => await register(user.username, user.email, user.password)
        .then( response => console.log(response.data)); 

    const handleSubmit = (e) => {
        e.preventDefault();
        response();
        document.querySelector("#signup").reset();
        handleClose();
    }

    const handleClose = () => {
        setSignUpIsOpen(false);
    }

    return (
        <div className="h-full w-full absolute top-0 left-0 bg-zinc-800/90 z-10">
            <div className="h-3/5 w-1/4 absolute left-1/3 top-36 bg-neutral-100 rounded-2xl">
                <div className="flex justify-center items-center h-full w-full">
                    <button
                        className="h-8 w-8 absolute -top-4 -right-4 bg-neutral-100 rounded-full"
                        onClick={() => handleClose()}
                    >
                        x
                    </button>
                    <form id="signup" className="h-3/4 w-2/3" onSubmit={handleSubmit}>
                        <fieldset className="flex flex-col self-center items-center">
                            <legend className="w-full mb-4 text-center text-3xl">Welcome to OP Recipes</legend>
                            <img src={nomad} width={150} height={150} alt="nomad"
                                className="object-cover rounded-full mb-8"></img>
                            <input 
                                type="text" 
                                name="username"
                                value={user.username}
                                onChange={updateUserData}
                                placeholder="Username" 
                                className="w-full h-8 pl-4 mb-2 bg-neutral-200 rounded-full">
                            </input>
                            <input 
                                type="text" 
                                name="email"
                                value={user.email} 
                                onChange={updateUserData} 
                                placeholder="Email" 
                                className="w-full h-8 pl-4 mb-2 bg-neutral-200 rounded-full">
                            </input>
                            <input 
                                type="text" 
                                name="password"
                                value={user.password}
                                onChange={updateUserData}
                                placeholder="Password" 
                                className="w-full h-8 pl-4 mb-2 bg-neutral-200 rounded-full">
                            </input>
                            <input type="text" placeholder="Confirm Password" className="w-full h-8 pl-4 bg-neutral-200 rounded-full"></input>
                            <div className="flex flex-col w-full mt-4">
                                <button type="submit" className="w-full h-8 bg-gray-900 text-neutral-100 rounded-full">Sign Up</button>
                                <p className="self-end text-xs">Already a member?</p>
                            </div>
                        </fieldset>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default SignUp;