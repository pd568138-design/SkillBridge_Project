import axios from "axios";

const API = axios.create({
  baseURL: "https://skillbridge-project-1-ck1y.onrender.com/api"
});

// MENTORS
export const getMentors = () => API.get("/mentors");
export const addMentor = (data) => API.post("/mentors", data);
export const deleteMentor = (id) => API.delete(`/mentors/${id}`);
export const updateMentor = (id, data) => API.put(`/mentors/${id}`, data);

// REGISTER / LOGIN (if needed)
export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);
