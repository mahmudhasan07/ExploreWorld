"use client"
import React, { useRef } from 'react';
import support from "../../../../public/support.json";
import Lottie from "lottie-react";
import "./Support.scss"
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

const Support = () => {

    const ref = useRef()
    const isInView = useInView(ref);

    return (
        <section className='my-10'>
            <h1 id='title' className='text-5xl text-center my-5 font-extrabold'>Technical Support </h1>
            <p className='title-text text-base font-semibold text-center my-2'>If you are have any technical issue with our website, please let us know.</p>
            <p className='title-text text-base font-semibold text-center my-1'>We try to solve the problem as soon as possible</p>

            <div className='flex justify-around my-5 overflow-hidden'>
                <motion.div ref={ref}
                    initial={{ opacity: 0, x: -200 }}

                    animate={isInView ? {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 1.2 },
                    }
                        :
                        {}}
                    className='w-2/5'>
                    <Lottie animationData={support} loop={true}></Lottie>
                </motion.div>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: 200 }}

                    animate={isInView ? {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 1.2 },
                        
                    }
                        :
                        {}}
                    className='p-2 overflow-hidden'>
                    <form action="" className='space-y-5'>
                        <div>
                            <label htmlFor="" className='text-xl font-semibold italic'>Enter Your Name :</label> <br />
                            <input type="text" className='border-2 border-black w-96 rounded-2xl p-2' />
                        </div>
                        <div>
                            <label htmlFor="" className='text-xl font-semibold italic'>Enter Your Email :</label> <br />
                            <input type="text" className='border-2 border-black w-96 rounded-2xl p-2' />
                        </div>
                        <div>
                            <label htmlFor="" className='text-xl font-semibold italic'>Enter Your Problem In Details :</label> <br />
                            <textarea name="" id="" className='w-96 p-2 border-2 border-black rounded-2xl h-40' ></textarea>
                        </div>
                        <div className=' my-0 w-fit mx-auto'>
                            <button id='button_Submit' className='border-2 p-2 text-white mt-3 border-white text-lg rounded-2xl font-semibold'>Submit</button>
                        </div>
                    </form>
                </motion.div>
            </div>

        </section>
    );
};

export default Support;