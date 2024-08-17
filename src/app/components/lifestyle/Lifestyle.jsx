"use-client"
import React from 'react';
import  "./Lifestyle.scss";
const Lifestyle = () => {
    return (
        <section id='title' className='my-10 space-y-5'>
            <div  className='text-center'>
                <h1 className='text-5xl font-extrabold my-2'>Categories Of Travel </h1>
                <p className='text-xl font-semibold'>Explore World with Us</p>
            </div>
            <div className='space-y-5'>
                <div  className='flex justify-center  gap-14'>
                    <div id='div1' className='relative  my-auto rounded-lg bg-black'>
                    <img src='https://i.ibb.co/h8t1yJY/historical.jpg' className='w-[500px] rounded-lg'></img>
                    <p className=' top-1/2 text-4xl font-extrabold left-1/4 text-white'>Historical Tour</p>
                    </div>
                    <div id='div1' className='relative  my-auto rounded-lg bg-black'>
                    <img src='https://i.ibb.co/vQsY3tG/relaxtravel.jpg' className='w-[500px] rounded-lg'></img>
                    <p className=' top-1/2 text-4xl font-extrabold left-1/4 text-white'>Relaxation Tour</p>
                    </div>
                </div>
                <div>
                <div className='flex justify-center  gap-10'>
                <div id='div1' className='relative  my-auto rounded-lg bg-black'>
                    <img src='https://i.ibb.co/jvnPgW3/City.jpg' className='w-[500px] rounded-lg'></img>
                    <p className=' top-1/2 text-4xl font-extrabold left-40 text-white'>City Tour</p>
                    </div>
                    <div id='div1' className='relative  my-auto rounded-lg bg-black'>
                    <img src='https://i.ibb.co/q0t9bkm/adventure.png' className='w-96 my-auto rounded-lg'></img>
                    <p className=' top-1/2 text-4xl font-extrabold left-12 text-white'>Adventure Tour</p>
                    </div>
                    <div id='div1' className='relative  my-auto rounded-lg bg-black'>
                    <img src='https://i.ibb.co/y414jgN/ecotourism.jpg' className='w-[500px] my-auto h-fit rounded-lg'></img>
                    <p className=' top-1/2 text-4xl font-extrabold left-1/4 text-white'>Ecotourism Tour</p>
                    </div>
                </div>
                </div>
            </div>

        </section>
    );
};

export default Lifestyle;