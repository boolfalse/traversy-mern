
import axios from "axios";

// this is the base url for the api set on "package.json"->"proxy"
// we could also use something like process.env.REACT_APP_API_URL
const API_URL = "/api/users/";

const authService = {
    register: async (userData) => {
        // with fetch
        // const res = await fetch('/api/auth/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(user)
        // });
        // const response = await res.json();

        // with axios
        const response = await axios.post(API_URL + "register", userData);

        if (response.data.success) {
            localStorage.setItem("user", JSON.stringify(response.data.data));
        }

        return response.data.data;
    },
    logout: async () => {
        localStorage.removeItem("user");
    },
    login: async (userData) => {
        const response = await axios.post(API_URL + "login", userData);

        if (response.data.success) {
            localStorage.setItem("user", JSON.stringify(response.data.data));
        }

        return response.data.data;
    }
};

export default authService;
