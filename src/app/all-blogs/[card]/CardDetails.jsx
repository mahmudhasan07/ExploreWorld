'use client'
import useFetch2 from '@/app/Hooks/useFetch2';
import React, { useContext, useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Card.css'
import useAxios, { AxiosSource } from '@/app/Hooks/useAxios';
import { ContextSource } from '@/app/ContextAPI/ContextAPI';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Rating } from '@mui/material';
import Comment from './Comment';
import Likes from './Likes';

const CardDetails = ({ params }) => {
    const [like, setLike] = useState(false);
    const [data, refetch] = useFetch2("blogs", params?.card)
    const axiosLink = useAxios(AxiosSource)
    const { user } = useContext(ContextSource)
    const [modal, setModal] = useState(false)
    let likes = data?.likes

    useEffect(() => {
        const getLike = async () => {
            await axiosLink.get(`/likes/${params?.card}?user=${user?.email}`)
                .then(res => {
                    if (res?.data) {
                        setLike(true)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        getLike()
    }, []);

    const handleLike = () => {
        likes.push(user?.email)
        if (user?.email) {
            axiosLink.patch(`/blogs/${params.card}`, { likes })
                .then(res => {
                    refetch()
                    setLike(true)
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            alert('Please login to like')
        }
    }

    const handleDislike = () => {
        likes = data?.likes.filter(e => e != user?.email)
        if (user?.email) {
            setLike(false)
            axiosLink.patch(`/blogs/${params.card}`, { likes })
                .then(res => {
                    setLike(false)
                    refetch()

                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            alert('Please login to dislike')
        }
    }

    return (
        <section>
            {
                data == "l" ?
                    "loading"
                    :
                    <div id='mainDiv'>
                        <div className='flex justify-around '>
                            <div id='imgDiv' className='w-1/2'>
                                <Swiper
                                    // cssMode={true}
                                    navigation={true}
                                    pagination={true}
                                    mousewheel={true}
                                    keyboard={true}
                                    loop={true}
                                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                                    className="h-[550px]"
                                >
                                    {
                                        data?.hostImages?.map((e, idx) => <SwiperSlide key={idx}>
                                            <img className='mx-auto rounded-xl w-full object-cover h-[520px]' src={e} alt="" />
                                        </SwiperSlide>)
                                    }
                                </Swiper>
                            </div>
                            <div className=' w-1/3 mt-[5%] space-y-2 h-fit'>
                                <h1 id='card_title' className='text-3xl font-bold '>{data?.name}</h1>
                                <h1 id='card_title' className='text-xl font-semibold'>Location : {data?.location}</h1>
                                <h1 className='text-xl font-bold'>Reviews: <Rating readOnly value={data?.averageRatting}></Rating> </h1>
                                <h1 className='text-xl font-bold flex gap-3'>Likes:
                                    {

                                        like == false ?
                                            <button onClick={handleLike}><FavoriteBorderIcon fontSize='large' className='text-3xl -mt-1'></FavoriteBorderIcon></button>
                                            :

                                            <button onClick={handleDislike}> <FavoriteIcon fontSize='large' className=' text-red-500 -mt-1'></FavoriteIcon></button>}
                                    <button onClick={() => setModal(true)} className='text-2xl -mt-1'>{data?.likes.length}</button></h1>
                            </div>
                            <dialog open={modal} className='rounded-xl shadow-2xl shadow-[#f36bb2] fixed top-1/3 p-5 z-50'>
                                <Likes like={data?.likes} setModal={setModal}></Likes>
                            </dialog>
                        </div>
                        <div className='flex justify-around p-2'>
                            <div className='w-1/2'>
                                <h1 id='title' className='text-3xl mb-3 font-semibold'>Description</h1>
                                <p className='text-lg font-semibold'>{data?.details}</p>
                            </div>
                            <Comment params={params} refetch1={refetch()}></Comment>
                        </div>
                    </div>
            }
        </section>
    );
};

export default CardDetails;