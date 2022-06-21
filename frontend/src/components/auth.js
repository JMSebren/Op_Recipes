import axios from 'axios';

// const authenticateUser = (email, password) => async (dispatch) {

// }

const BASE_URL_AUTH = "http://localhost:8080/api/auth";

const initialState = {
    "username": "",
    "email": "",
    "password": "",
    "role": "USER"
}

const testLogin = {
    "email": "testuseremail@testuser.com",
    "password": "testuserpassword"
}

// axios.get('something')
//     .then( (res) => console.log(res) );

//  USER LOGIN
export const authUser = (email, password) =>axios({
    method: 'post',
    url: `${BASE_URL_AUTH}/login`,
    data: {
        email: email,
        password: password
    },
    responseType: 'json'

} )

// USER LOGOUT
export const logout = () => {
    localStorage.clear();
}

// USER REGISTER
export const register = (username, email, password) => axios({
    method: 'post',
    url: `${BASE_URL_AUTH}/register`,
    data: {
        username: username,
        email: email,
        password: password
    },
    responseType: 'json'
})