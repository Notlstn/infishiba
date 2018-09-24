import axios from "axios";

const instance = axios.create({
    baseURL: "https://cors-anywhere.herokuapp.com/https://shibe.online/api"
});

export default instance;
