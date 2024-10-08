"use client"
import React, { createContext, useEffect, useState } from 'react';
import useAuth from '../auth/useAuth';
import useAxios, { AxiosSource } from '../Hooks/useAxios';

export const ContextSource = createContext()
const ContextAPI = ({ children }) => {
    const [user, setUser] = useState();
    const [loader, setloader] = useState(true)
    const axiosLink = useAxios(AxiosSource)

    useEffect(() => {
        const userIdentifier = setInterval(() => {
            const userDetails = useAuth?.getCurrentUser()
            userDetails?.getSession((err, res) => {
                if (res?.idToken?.payload) {
                    setUser(res?.idToken?.payload)
                    setloader(false)
                    // console.log(res?.idToken?.payload?.email);

                    axiosLink.post('/jwt', { email: res?.idToken?.payload?.email })
                        .then(res => {
                            return(res.data)
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    clearInterval(userIdentifier)

                }
            })
        }, 500);

    }, [loader]);


    const data = { user, loader, setloader, setUser }
    return <ContextSource.Provider value={data}>
        {children} </ContextSource.Provider>
};

export default ContextAPI;