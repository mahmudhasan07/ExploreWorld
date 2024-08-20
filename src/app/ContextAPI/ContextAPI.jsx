"use client"
import React, { createContext, useEffect, useState } from 'react';
import useAuth from '../auth/useAuth';

export const ContextSource = createContext()
const ContextAPI = ({ children }) => {
    const [user, setUser] = useState();
    const [loader, setloader] = useState(false)

    
    useEffect(() => {
        // console.log(loader);
        if (loader == false) {
            const userDetails = useAuth?.getCurrentUser()
            if (userDetails) {
                userDetails?.getSession((err, res) => {
                    if (res) {
                        setUser(res?.idToken?.payload)
                        // clearInterval(findUser)


                    }
                })
            }
        }
        else {
            setUser(null)
            return
        }

    }, [loader]);
    // console.log(user);
    const data = { user, loader, setloader }
    return <ContextSource.Provider value={data}>
        {children} </ContextSource.Provider>
};

export default ContextAPI;