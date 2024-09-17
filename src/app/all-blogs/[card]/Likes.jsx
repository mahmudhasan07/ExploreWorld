'use client'
import useAxios, { AxiosSource } from '@/app/Hooks/useAxios';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";

const Likes = ({ like, setModal }) => {
    // console.log(like);
    const [Likers, setLikers] = useState([]);
    const route = useRouter()
    console.log(like);

    const axiosLink = useAxios(AxiosSource)
    useEffect(() => {
        axiosLink.get(`/alllikes?data=${like}`)
            .then(res => {
                console.log(res);
                setLikers(res?.data)

            })
            .catch(err => {
                console.log(err);

            })
    }, [axiosLink]);

    const handleNavigate = (email) => {
        console.log(email);

        const userEmail = email.split("@")
        if (userEmail) {
            route.push(`/${userEmail[0]}`)
        }

    }
    return (
        <section className='space-y-3'>
            <div className='flex justify-between'>
                <h1 className='text-xl font-semibold'>Likes({like?.length})</h1>
                <button className='text-xl font-bold' onClick={() => setModal(false)}><IoMdCloseCircle /></button>
            </div>
            <hr className='w-full border-black' />
            <div className='space-y-3'>
                {
                    Likers.map(e =>
                        <div className='flex gap-5'>
                            <img className='w-12 object-cover object-top h-12 rounded-full' src={e.Image} alt="" />
                            <div className='my-auto'>
                                <button onClick={() => handleNavigate(e.Email)} className='text-lg font-semibold my-auto hover:underline'>{e.Name}</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    );
};

export default Likes;