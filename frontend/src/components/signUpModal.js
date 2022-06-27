import React, { useState } from 'react'; 
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
        <div className="absolute top-0 left-0 z-10 w-full h-full bg-zinc-800/90">
            <div className="absolute w-1/4 h-3/5 left-1/3 top-36 bg-neutral-100 rounded-2xl">
                <div className="flex items-center justify-center w-full h-full">
                    <button
                        className="absolute w-8 h-8 rounded-full -top-4 -right-4 bg-neutral-100"
                        onClick={() => handleClose()}
                    >
                        x
                    </button>
                    <form id="signup" className="w-2/3 h-3/4" onSubmit={handleSubmit}>
                        <fieldset className="flex flex-col items-center self-center">
                            <legend className="w-full mb-4 text-3xl text-center">Welcome to OP Recipes</legend>
                            <img src={nomad} width={150} height={150} alt="nomad"
                                className="object-cover mb-8 rounded-full"></img>
                            <input 
                                type="text" 
                                name="username"
                                value={user.username}
                                onChange={updateUserData}
                                placeholder="Username" 
                                className="w-full h-8 pl-4 mb-2 rounded-full bg-neutral-200">
                            </input>
                            <input 
                                type="email" 
                                name="email"
                                value={user.email} 
                                onChange={updateUserData} 
                                placeholder="Email" 
                                className="w-full h-8 pl-4 mb-2 rounded-full bg-neutral-200">
                            </input>
                            <input 
                                type="password" 
                                name="password"
                                value={user.password}
                                onChange={updateUserData}
                                placeholder="Password" 
                                className="w-full h-8 pl-4 mb-2 rounded-full bg-neutral-200">
                            </input>
                            <input type="password" placeholder="Confirm Password" className="w-full h-8 pl-4 rounded-full bg-neutral-200"></input>
                            <div className="flex flex-col w-full mt-4">
                                <button type="submit" className="w-full h-8 bg-gray-900 rounded-full text-neutral-100">Sign Up</button>
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