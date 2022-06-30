import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import title_and_logo from '../assets/title_and_logo.png';
import logo from '../assets/logo_53.png';
import newLogo from '../assets/white_logo.png';

import { logout } from '../adapters/auth.js';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleSignUpClick = this.handleSignUpClick.bind(this);
        this.handleOpenBurgerMenu = this.handleOpenBurgerMenu.bind(this);
        this.handleRecipeModal = this.handleRecipeModal.bind(this);

        this.state = { 
            loggedIn: this.props.parentState.loggedIn.valueOf(),
            loginIsOpen : false,
            signUpIsOpen: false,
            burgerIsOpen: false,
            recipeIsOpen: false
        } 
    }

    // CLICK HANDLERS - UPDATES STATE WHEN CORRESPONDING BUTTONS IS CLICKED
    handleLoginClick () {
        console.log("This is Login");
        this.props.setParentState({loginIsOpen: !this.props.parentState.loginIsOpen});       
    }

    handleLogoutClick () {
        logout();
        this.props.setParentState({loggedIn: !this.props.parentState.loggedIn.valueOf()});
    }

    handleSignUpClick() {
        console.log("This is Signup");
        this.props.setParentState({signUpIsOpen: !this.props.parentState.signUpIsOpen});
    }

    handleOpenBurgerMenu() {
        console.log(this.state.burgerIsOpen);
        this.setState({burgerIsOpen: !this.state.burgerIsOpen});
    }

    handleRecipeModal() {
        console.log(this.props.parentState.recipeIsOpen);
        this.props.setParentState({recipeIsOpen: !this.props.parentState.recipeIsOpen})
    }

    /* //////////////////////////////////////////////////////////////////////////////////////////////////////// */

    render() {
        const loggedIn = this.props.parentState.loggedIn;
        const burgerOpen = this.state.burgerIsOpen;

        let loggedInNav;
        let burgerMenu;

        // CONDITIONAL RENDERING FOR MENU
        if (burgerOpen) {
            burgerMenu = (
                <div className="absolute z-10 flex flex-col items-end w-32 bg-white rounded-md h-36 top-14 right-4"
                    onMouseLeave={ () => this.handleOpenBurgerMenu()}
                >
                    <Link to="/profile" state={{ componentType: 'profile' }} className="text-xl">Profile</Link>
                    {/* <Link to="/collections" state={{ componentType: 'collections' }} className="text-xl">Recipes</Link> */}
                    <Link to="/about" className="text-xl">About</Link>
                    <Link to="/" onClick={ () => this.handleLogoutClick()} className="text-xl">Sign Out</Link>
                </div>
            )
        } else {
            burgerMenu = null;
        }
        // MAKE BUTTON THAT SAYS 'FOODS ME'
        
        // CONDITIONAL RENDERING FOR NAV BAR - SEARCH BAR APPEARS AND LAYOUT CHANGES WHEN USER IS LOGGED IN
        if (loggedIn) {
            // DISPLAY FOR WHEN USER IS LOGGED IN - INCLUDES SEARCH BAR, NEW RECIPE BUTTON, AND A MENU FOR OTHER LINKS
            loggedInNav = (
                <nav className="relative top-0 z-10 flex flex-row justify-between h-16 bg-red-700">
                    <div className="absolute z-0 w-56 h-56 bg-red-700 rounded-full -left-16 -top-16">
                        <img src={newLogo} alt="logo" className="absolute ml-4 w-52 h-52 top-8 left-2"></img>
                    </div>
                    
                    <div id="nav-loggedin-left-elements" className="z-10 flex flex-row w-1/4 space-x-8 align-middle">
                        
                        <Link
                            to="/"
                            className="z-10 self-center w-20 h-8 ml-40 mr-2 leading-8 text-center bg-gray-900 rounded-full text-neutral-100 "
                            type="button"
                        >                            
                            Home                       
                        </Link>
                    </div>
                    
                    <div id="nav-searchBar" className="self-center w-1/2 h-8 bg-gray-200 rounded-full grow"> 
                        <input type="text" placeholder="Search" className="h-8 ml-6 bg-gray-200 rounded-full" ></input>
                    </div>
                    <div id="nav-loggedin-right-elements" className="flex flex-row self-center justify-end w-1/4 mx-4 space-x-6">                        
                        <button 
                            className="w-8 h-8 rounded-full bg-neutral-200"
                            type="button"
                            onClick={ () => this.handleRecipeModal()}
                        >
                            +
                        </button>
                        {/* <p id="addNew" onClick={ () => this.handleRecipeModal()} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseOut}> +</p> */}
                        <p className="text-2xl text-neutral-100">{this.props.parentState.currentUser}</p>
                        <button 
                            className="w-8 h-8 rounded-full bg-neutral-200"
                            type="button"
                            onMouseOver={ () => this.handleOpenBurgerMenu()}
                            
                        >
                            =
                        </button>
                    </div>                
                </nav>
                
            );
        } else {
            // DISPLAY FOR WHEN USER HAS NOT YET LOGGED IN - INCLUDES BUTTONS FOR LOGIN AND SIGNUP
            loggedInNav = (
                <nav className="relative top-0 z-10 flex flex-row justify-between h-16 bg-red-700 ">
                    <img src={title_and_logo} alt="logo" className="z-10 ml-4 "></img>
                    <div className="absolute z-0 w-56 h-56 bg-red-700 rounded-full -left-24 -top-16"></div>
                    <div id="nav-notin-right-elements" className="self-center mr-12">
                        <button 
                            className="w-20 h-8 mr-2 bg-gray-900 rounded-full text-neutral-100"
                            type="button"
                            onClick={ () => this.handleLoginClick()} 
                        >                            
                            Log In                           
                        </button>
                        <button 
                            className="w-20 h-8 bg-red-700 rounded-full text-neutral-100"
                            type="button"
                            onClick={ () => this.handleSignUpClick()} 
                        >
                            Sign Up
                        </button>
                    </div>                
                </nav>
            )
        }
        // RETURNS THE ELEMENTS TO RENDER BASED ON THE ABOVE CONDITIONAL RENDERING STATEMENTS
        return (
            <div className="relative">
                {loggedInNav}
                {burgerMenu}
            </div>                              
        ) 
    }
}

export default NavBar;