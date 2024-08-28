"use client"
import React, { createContext, useEffect, useState } from 'react';
import useAuth from '../auth/useAuth';

export const ContextSource = createContext()
const ContextAPI = ({ children }) => {
    const [user, setUser] = useState();
    const [loader, setloader] = useState(true)
    console.log(user);
    
    useEffect(() => {
        const userIdentifier = setInterval(() => {
            const userDetails = useAuth?.getCurrentUser()
            userDetails?.getSession((err, res) => {
                if (res) {
                    setUser(res?.idToken?.payload)
                    setloader(false)
                    clearInterval(userIdentifier)
    
                }
            })
        }, 500);

    }, [loader]);

    

    // console.log(user);
    const data = { user, loader, setloader, setUser }
    return <ContextSource.Provider value={data}>
        {children} </ContextSource.Provider>
};

export default ContextAPI;