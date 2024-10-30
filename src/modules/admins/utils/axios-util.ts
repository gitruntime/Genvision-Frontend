import axios from 'axios';

export const getBaseURL = () => {
    const { hostname } = window.location; 
    const subdomain = hostname.split('.')[0]; 

    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    
    return `${protocol}://${subdomain}.localhost:3000`;
};


const api = axios.create({
    baseURL:getBaseURL(),
    withCredentials:true
});

// api.interceptors.request.use((config) => {
//     const token = 
// })