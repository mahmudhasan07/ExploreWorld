import axios from 'axios';
import React from 'react';

export const AxiosSource = axios.create({
    baseURL: 'https://explore-world-server-umber.vercel.app',
    // baseURL: 'http://localhost:5000',
    withCredentials: true

});

const useAxios = () => {
    return AxiosSource
};
export default useAxios;