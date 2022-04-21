import axios from 'axios';
import cookies from 'js-cookie'

const BASE_URL = "http://localhost:5000/api/"
const access_token = cookies.get("access-token")
console.log("access toke0", access_token)

export const adminRequest = axios.create({
    baseURL: BASE_URL,
    headers: { access_token }
})