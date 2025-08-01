import axios from 'axios';
import {BASE_URL} from "./apiPaths";

const axiosInstance = axios.create ({
    baseURL: BASE_URL,
    timeout: 10000,
    headers:{
        "Content-Type": "application/json",
        Accept: "application/json",
    }
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("token");
        if (accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
    
        }
        return config;
    },
    (error: any)=>{
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response: any) => {
        return response;
    },
    (error: { response: { status: number; }; code: string; })=>{
        if(error.response.status === 401){
            window.location.href = "/login";
        }else if (error.response.status === 500){
            console.error("Server error. Please try again later");
        }else if( error.code === "ECONNABORTED"){
            console.error("Request timeout.Please try again")
        }
    }
)

export default axiosInstance;