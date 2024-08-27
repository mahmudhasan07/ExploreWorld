"use client"
import React, { createContext, useEffect, useState } from 'react';
import useAuth from '../auth/useAuth';

export const ContextSource = createContext()
const ContextAPI = ({ children }) => {
    const [user, setUser] = useState();
    const [loader, setloader] = useState(true)


    useEffect(() => {
        // console.log(loader);
        const userDetails = useAuth?.getCurrentUser()
        console.log(userDetails);
        
            if (userDetails) {
                userDetails?.getSession((err, res) => {
                    if (res) {
                        setUser(res?.idToken?.payload)
                        if(user){
                            setloader(false)
                        }
                        // setloader(true)
                        // clearInterval(findUser)

                    }
                })
            }

    }, [loader]);
    // console.log(user);
    const data = { user, loader, setloader }
    return <ContextSource.Provider value={data}>
        {children} </ContextSource.Provider>
};

export default ContextAPI;