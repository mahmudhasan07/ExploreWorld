'use client'
import useFetch1 from '@/app/Hooks/useFetch1';
import React, { useRef } from 'react';
import {motion, useInView} from 'framer-motion'
import "./TopReview.css"

const TopReview = () => {
    const [data] = useFetch1("topRatting")
    // const ref = useRef()
    // const isView = useInView(ref)
    return (
        <section className='my-10'>
            <h1 id='title' className="text-5xl text-center font-bold mb-10">Top Reviews places</h1>
            <div className='flex justify-center gap-10 my-5'>
                {
                    data == "l"?
                    "loading"
                    :
                    data?.slice(0,4)?.map((e,idx)=> 
                    <motion.div
                    initial={{opacity : 0, x : -(100*(idx+1))}}
                    whileInView={{opacity : 1, x : 0, transition :{duration: 0.7*(idx+1)}}}
                     id='card1' key={idx}>
                        <div id='card2'>
                            <img src={e.hostImages[0]} alt="image" className="w-72 h-52 rounded-2xl"/>
                            <h1 className='text-xl font-semibold'>{e.name}</h1>
                            <h1 className='text-xl font-semibold'>{e.location}</h1>
                        </div>
                    </motion.div>)
                }
            </div>
        </section>
    );
};

export default TopReview;