import React, {Component} from 'react';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Routes,
	Switch,
	Route,
	Link
} from'react-router-dom';
import NavBar from './components/navbar';
import authToken from './components/authToken.js';

import Home from './components/home.js';
import Results from './components/results.js';
import Page from './components/page_template.js';
import About from './components/about.js';
import Login from './components/loginModal.js';
import SignUp from './components/signUpModal.js';
import RecipeModal from './components/recipeModal.js';

// import './App.css';

// const token = document.querySelector('meta[name="_csrf"]').textContent;
// const header = document.querySelector('meta[name="_csrf_header"]').textContent;

class App extends Component{
	
	constructor(props) {
		super(props);
		this.state = {
			visited: false,
			loggedIn: false,
			loginIsOpen: false,
			signUpIsOpen: false,
			recipeIsOpen: false,
			currentUser: ""			
		}
		this.handleLoginChange =  this.handleLoginChange.bind(this);
		this.handleLoginModal = this.handleLoginModal.bind(this);
		this.handleSignUpModal = this.handleSignUpModal.bind(this);
		this.handleRecipeModal = this.handleRecipeModal.bind(this);
	}
	
	componentDidMount() {
		const token = localStorage.getItem('access_token');
		if (token) {
			axios.defaults.headers.common["Authorization"] = `${token}`;
			this.setState({loggedIn: true});

			this.setState({currentUser: localStorage.getItem('username')});
		} 
	}
	
	handleLoginChange() {
		this.setState({loggedIn: !this.state.loggedIn.valueOf()});
	}

	handleLoginModal() {
		this.setState({loginIsOpen: !this.state.loginIsOpen.valueOf()});		
	}

	handleUserUpdate() {
		this.setState({currentUser: this.state.currentUser.valueOf()});
	}

	handleSignUpModal() {
		this.setState({signUpIsOpen: !this.state.signUpIsOpen.valueOf()});
	}

	handleRecipeModal() {
		this.setState({recipeIsOpen: !this.state.recipeIsOpen.valueOf()});
	}
	
render () {

	return (
	
				<Router>
					<div className="flex flex-col min-h-screen min-w-full relative z-0 ">
						< NavBar parentState = {this.state} setParentState={(state) => this.setState(state)}/>
						{this.state.loginIsOpen && < Login setLoginIsOpen={this.handleLoginModal} updateLogin={this.handleLoginChange} />}
						{this.state.signUpIsOpen && < SignUp setSignUpIsOpen={this.handleSignUpModal}  />}
						{this.state.recipeIsOpen && < RecipeModal setRecipeIsOpen={this.handleRecipeModal}  />}
						<Routes>
							<Route exact path="/" element= {< Home />}></Route>
							<Route exact path='/search' element= {< Results />}></Route>
							<Route exact path='/profile' element= {< Page componentType={'profile'} />}></Route>
							<Route exact path='/collections' element= {< Page componentType={'collections'} />}></Route>
							<Route exact path='/recipe' element= {< Page componentType={'recipe'} />}></Route>
							<Route exact path='/template' element= {< Page componentType={'template'} />}></Route>
							<Route exact path='/about' element= {< About />}></Route>
						</Routes>
					</div>
				</Router>			

	);}
}
  
  export default App;
  