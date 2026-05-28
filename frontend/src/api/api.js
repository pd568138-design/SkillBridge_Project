import axios from "axios";

const API = axios.create({
  baseURL: "https://skillbridge-project-6e9a.onrender.com/"
});

export default API;
