import React, {Component} from 'react';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from'react-router-dom';
import NavBar from './components/navbar';
import Home from './components/home.js';
import Results from './components/results.js';
import Page from './components/page_template.js';
import Recipe from './components/recipePage';
import About from './components/about.js';
import Login from './components/loginModal.js';
import SignUp from './components/signUpModal.js';
import RecipeModal from './components/recipeModal.js';

class App extends Component{
	
	constructor(props) {
		super(props);
		this.state = {
			visited: false,
			loggedIn: false,
			loginIsOpen: false,
			signUpIsOpen: false,
			recipeIsOpen: false,
			currentUser: localStorage.getItem('username')			
		}
		this.handleLoginChange =  this.handleLoginChange.bind(this);
		this.handleLoginModal = this.handleLoginModal.bind(this);
		this.handleSignUpModal = this.handleSignUpModal.bind(this);
		this.handleRecipeModal = this.handleRecipeModal.bind(this);
		this.handleUserUpdate = this.handleUserUpdate.bind(this);
	}
	
	componentDidMount() {
		const token = localStorage.getItem('access_token');
		if (token != null) {			
			// axios.defaults.headers.common["Authorization"] = token;
			// axios.defaults.headers.common["Content-Type"] = "application/json";
			this.setState({loggedIn: true});

			this.setState({currentUser: localStorage.getItem('username')});
		} else if (token == null) {
			this.setState({loggedIn: false});
		}
	}
	
	handleLoginChange() {
		this.setState({loggedIn: !this.state.loggedIn.valueOf()});
		setTimeout( () => {
			this.handleUserUpdate();
		}, 200 );
		
	}

	handleLoginModal() {
		this.setState({loginIsOpen: !this.state.loginIsOpen.valueOf()});		
	}

	handleUserUpdate() {
		this.setState({currentUser: localStorage.getItem('username')});
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
					<div className="relative z-0 flex flex-col min-w-full min-h-screen ">
						< NavBar parentState = {this.state} setParentState={(state) => this.setState(state)}/>
						{this.state.loginIsOpen && < Login 
							setLoginIsOpen={this.handleLoginModal} 
							updateLogin={this.handleLoginChange} />}
						{this.state.signUpIsOpen && < SignUp setSignUpIsOpen={this.handleSignUpModal}  />}
						{this.state.recipeIsOpen && < RecipeModal setRecipeIsOpen={this.handleRecipeModal}  />}
						<Routes>
							<Route exact path="/" element= {< Home />}></Route>
							<Route exact path='/search' element= {< Results />}></Route>
							<Route exact path='/profile' element= {< Page componentType={'profile'} />}></Route>
							<Route exact path='/collections' element= {< Page componentType={'collections'} />}></Route>
							<Route exact path='/recipe' element= {< Recipe index="" />}></Route>
							<Route exact path='/template' element= {< Page componentType={'template'} />}></Route>
							<Route exact path='/about' element= {< About />}></Route>
						</Routes>
					</div>
				</Router>			

	);}
}
  
  export default App;
  