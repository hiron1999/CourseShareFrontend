import axios from "axios";

const BaseURL = 'http://127.0.0.1:8080';
export default axios.create({
    baseURL : BaseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})

export const axiosPrivate = axios.create({
    baseURL : BaseURL ,
    headers: { 
        'Content-Type': 'application/json',
     },
    // withCredentials: true,
    
})