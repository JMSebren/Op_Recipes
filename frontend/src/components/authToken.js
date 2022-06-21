import axios from 'axios';

export const authToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default authToken;