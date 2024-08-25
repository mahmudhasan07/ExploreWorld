'use client'
import React, { useContext } from 'react';
import { ContextSource } from '../ContextAPI/ContextAPI';

const MyBlog = () => {
    const {user} = useContext(ContextSource)

    return (
        <section>
            <h1>{user?.name} blogs...</h1>
        </section>
    );
};

export default MyBlog;