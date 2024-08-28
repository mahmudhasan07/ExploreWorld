'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectCreative, Navigation, Pagination } from 'swiper/modules';
import "./Banner.css";
import useFetch1 from '@/app/Hooks/useFetch1';

const Banner = () => {
    console.log("hello");
    return (
        <section className='my-3'>
            <Swiper
                grabCursor={true}
                effect={'creative'}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: ['-120%', 0, -500],
                    },
                    next: {
                        shadow: true,
                        translate: ['120%', 0, -500],
                    },
                }}
                navigation
                loop={true}
                speed={1500}               
                autoplay={{delay : 3000}}
                // pagination={{ clickable: true }}
                modules={[EffectCreative, Navigation, Pagination, Autoplay]}
                className="mySwiper2 w-11/12 "
            >
                <SwiperSlide>
                    <div className='bg-black relative rounded-xl exo-2'>
                        <img src='https://i.ibb.co/2Zm86yp/galcier.jpg' className='w-full h-[650px] object-cover rounded-xl opacity-55' />
                        <div className='w-1/2 absolute top-1/3 text-white lg:left-12 md:left-7 left-1 italic'>
                            <h1 className='text-6xl font-bold'>Glacier National Park</h1>
                            <p className='text-xl font-semibold'>One of the most striking parks in America. There are more than 700 miles of hiking trails in this Montana crown jewel, plus 13 designated areas for camping</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='bg-black relative rounded-xl exo-2'>
                        <img src='https://i.ibb.co/pvVRS4r/maldive.jpg' className='w-full h-[650px] object-cover rounded-xl opacity-55' />
                        <div className='w-1/2 absolute top-1/3 text-white lg:left-12 md:left-7 left-1 italic'>
                            <h1 className='text-6xl font-bold'>Maldives</h1>
                            <p className='text-xl font-semibold'>It is not cheap or easy to reach, but this isolated Indian Ocean vacation spot located southwest of India is the personification of a dreamy tropical retreat.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='bg-black relative rounded-xl exo-2'>
                        <img src='https://i.ibb.co/cyHg4Sk/Santorini.png' className='w-full h-[650px] object-cover rounded-xl opacity-55' />
                        <div className='w-1/2 absolute top-1/3 text-white lg:left-12 md:left-7 left-1 italic'>
                            <h1 className='text-6xl font-bold'>Santorini</h1>
                            <p className='text-xl font-semibold'>Frequently touted as a top honeymoon destination, Greece's most popular isle woos newlyweds every year with its breathtaking sunsets, whitewashed villages and colorful beaches.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='bg-black relative rounded-xl exo-2'>
                        <img src='https://i.ibb.co/0CsKTGH/cox-s-bazar.jpg' className='w-full h-[650px] object-cover rounded-xl opacity-55' />
                        <div className='w-1/2 absolute top-1/3 text-white lg:left-12 md:left-7 left-1 italic'>
                            <h1 className='text-6xl font-bold'>Cox's Bazar</h1>
                            <p className='text-xl font-semibold'>Cox’s Bazar is a town on the southeast coast of Bangladesh. It’s known for its very long, sandy beachfront, stretching from Sea Beach in the north to Kolatoli Beach in the south.</p>
                        </div>
                    </div>
                </SwiperSlide>

                {/* <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide> */}
            </Swiper>
        </section>
    );

};

export default Banner;