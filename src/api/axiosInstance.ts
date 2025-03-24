import axios, { InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';

// Crear la instancia de Axios
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para agregar el token a todas las solicitudes
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {  // 🔍 Cambiamos el tipo aquí
        const token = localStorage.getItem('access_token');
        
        if (token) {
            if (!config.headers) {
                config.headers = {} as AxiosRequestHeaders;
            }
            config.headers['Authorization'] = `Bearer ${token}`;  // 🔒 Agregamos el token al header
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;