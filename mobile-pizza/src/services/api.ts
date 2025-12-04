import axios from 'axios';

const api = axios.create({
    //baseURL: 'https://localhost:8000'
    baseURL: 'http://192.168.1.9:8000'
})

export {api};