import axios from 'axios';

export  function setInterceptors(instance)  {
    instance.interceptors.request.use(
      (config) => {
        config.withCredentials=true;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    // Add a response interceptor
     instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      },
    );
  
    return instance;
  }
  export const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': "application/json",
    }
  
  });