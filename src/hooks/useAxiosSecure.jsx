import React from 'react';
import axios from 'axios';
import useAuth from './useAuth';






const axiosSecure = axios.create({
    // baseURL: "https://tradbazar-server.vercel.app"
    baseURL:"http://localhost:3000"
});


const useAxiosSecure = () => {
    const { user } = useAuth();

    axiosSecure.interceptors.request.use(
        async (config) => {
            if (user) {
                // 🔥 Fetch latest token dynamically
                const token = await user.getIdToken();
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );


    return axiosSecure;
};

export default useAxiosSecure;