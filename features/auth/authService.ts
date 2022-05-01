import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth/';

// register user
const register = async (data: any) => {
    const response = await axios.post(API_URL, data);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

const authService = {
    register
}

export default authService;