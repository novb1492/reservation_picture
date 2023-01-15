export  function setInterceptors(instance)  {
    instance.interceptors.request.use(
      (config) => {
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
    withCredentials: true,
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': "application/json",
    }
  
  });