import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  // baseURL: "https://speakable.online:3000/api/",
  // baseURL: "https://may-9-backend-speakable.onrender.com/api/",
  withCredentials: true,
});

export default instance;
