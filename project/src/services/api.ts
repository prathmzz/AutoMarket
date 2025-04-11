import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // your Flask backend
});

export default API;
