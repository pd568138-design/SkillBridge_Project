import axios from "axios";

const API = axios.create({
  baseURL: "https://skillbridge-project-1-ck1y.onrender.com/api/auth"
});

// REGISTER
export const registerUser = (data) => API.post("/register", data);

// LOGIN
export const loginUser = (data) => API.post("/login", data);

export default API;
