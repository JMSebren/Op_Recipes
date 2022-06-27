import axios from 'axios';

const BASE_URL_AUTH = "http://localhost:8080/api/auth";

//  USER LOGIN
export const authUser = (email, password) =>axios({
    method: 'post',
    url: `${BASE_URL_AUTH}/login`,
    headers: {
        'Content-Type': 'application/json'
    },
    data: {
        email: email,
        password: password
    },
    responseType: 'json'

} )

// USER LOGOUT - WILL BE UPDATED TO BOTH CLEAR LOCAL STORAGE AND SEND REQUEST TO API TO CLEAR
//   THE SECURITY CONTEXT AND ELIMINATE USER'S REFRESH TOKENS.
export const logout = () => {
    localStorage.clear();
}

// USER REGISTER
export const register = (username, email, password) => axios({
    method: 'post',
    url: `${BASE_URL_AUTH}/register`,
    headers: {
        'Content-Type': 'application/json'
    },
    data: {
        username: username,
        email: email,
        password: password
    },
    responseType: 'json'
})