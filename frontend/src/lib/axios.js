import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/"
    : "https://message-socket-io-appserver.vercel.app/api/";


export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  
});
