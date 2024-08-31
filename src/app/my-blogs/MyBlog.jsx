'use client'
import React, { useContext } from 'react';
import { ContextSource } from '../ContextAPI/ContextAPI';
import useFetch1 from '../Hooks/useFetch1';
import MyCard from './MyCard';

const MyBlog = () => {
    const { user } = useContext(ContextSource)
    const [data, refetch] = useFetch1('my-blogs', user?.email)
    console.log(data);


    return (
        <section>
            <h1 id='title' className='text-4xl font-semibold text-center mt-5 mb-10'>{user?.name} blogs...</h1>
            <div className='space-y-3'>
            {
                data == "l" ?
                    "loading"
                    :
                    data?.length < 1 ?
                    <h1 className='text-center text-xl font-semibold'>No Blogs are posted by you</h1>
                    :
                    data.map((e, idx) => <MyCard key={idx} card={e}></MyCard>)
            }
            </div>
        </section>
    );
};


export default MyBlog;