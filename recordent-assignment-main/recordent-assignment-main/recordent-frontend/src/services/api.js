import axios from "axios";

const API = axios.create({

  baseURL: "https://buyer-management.onrender.com",


});


// This automatically attaches correct token EVERY time

API.interceptors.request.use(

  (config) => {

    const token = sessionStorage.getItem("token");

    if(token){

      config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

  },

  (error) => Promise.reject(error)

);

export default API;
