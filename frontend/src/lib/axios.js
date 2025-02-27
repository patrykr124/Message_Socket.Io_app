import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: ["http://localhost:5000/api/" , "https://message-socket-io-appserver.vercel.app/"] ,
  withCredentials: true,
  
});
