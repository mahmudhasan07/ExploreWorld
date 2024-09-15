import axios from 'axios';
import React from 'react';

export const AxiosSource = axios.create({
    baseURL: 'https://exploreserver-common.vercel.app',
    // baseURL: 'http://localhost:2000',
    withCredentials: true

});

const useAxios = () => {
    return AxiosSource
};
export default useAxios;