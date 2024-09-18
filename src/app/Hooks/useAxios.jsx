import axios from 'axios';
import React from 'react';

export const AxiosSource = axios.create({
    // baseURL: 'https://exploreserver-common.vercel.app',
    baseURL: 'https://explore-world-server-umber.vercel.app',
    withCredentials: true

});

const useAxios = () => {
    return AxiosSource
};
export default useAxios;