import axios from "axios"


//“atalho” para fazer requisições ao backend.
export const api = axios.create({
    baseURL: "http://localhost:8000"
})