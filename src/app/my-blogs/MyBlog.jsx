'use client'
import React, { useContext } from 'react';
import { ContextSource } from '../ContextAPI/ContextAPI';
import useFetch2 from '../Hooks/useFetch2';

const MyBlog = () => {
    const {user} = useContext(ContextSource)
    const [data, refetch] = useFetch2()

    return (
        <section>
            <h1>{user?.name} blogs...</h1>
        </section>
    );
};

export default MyBlog;