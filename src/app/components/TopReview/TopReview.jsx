'use client'
import useFetch1 from '@/app/Hooks/useFetch1';
import React from 'react';
import "./TopReview.css"

const TopReview = () => {
    const [data] = useFetch1("topRatting")
    return (
        <section className='my-10'>
            <h1 id='title' className="text-5xl text-center font-bold mb-10">Top Reviews places</h1>
            <div className='flex justify-center gap-10 my-5'>
                {
                    data == "l"?
                    "loading"
                    :
                    data?.slice(0,4)?.map((e,idx)=> 
                    <div id='card1' key={idx}>
                        <div id='card2'>
                            <img src={e.hostImages[0]} alt="image" className="w-72 h-52 rounded-2xl"/>
                            <h1 className='text-xl font-semibold'>{e.name}</h1>
                            <h1 className='text-xl font-semibold'>{e.location}</h1>
                        </div>
                    </div>)
                }
            </div>
        </section>
    );
};

export default TopReview;