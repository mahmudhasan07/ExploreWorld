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

const CardDetails = ({ params }) => {
    const [like, setLike] = useState(false);
    const [data, refetch] = useFetch2("blogs", params?.card)
    const axiosLink = useAxios(AxiosSource)
    const { user } = useContext(ContextSource)
    const [ratting, setRatting] = useState();
    let likes = data?.likes
    let comments = data?.comments
    const commentInput = useRef()
    const rate = [1, 2, 3, 4, 5]
    const [avgRate, setAvgRate] = useState(0)

    useEffect(() => {
        axiosLink.get(`/ratting/${params?.card}`)
            .then(res => {
                console.log(res.data);
                setAvgRate(res?.data?.averageRatting)

            })
            .catch(err => {
                console.log(err);

            })
            axiosLink.get(`/likes/${params?.card}?user=${user?.email}`)
            .then(res => {
                if (res.data) {
                    setLike(true)
                    // clearInterval(likeCounter)
                }
            })
            .catch(err => {
                console.log(err)
                // clearInterval(likeCounter)
            })
    }, []);

    const handleLike = () => {
        likes.push(user?.email)
        axiosLink.patch(`/blogs/${params.card}`, { likes })
            .then(res => {
                refetch()
                setLike(true)
            })
            .catch(err => {
                console.log(err);


            })
    }

    const handleDislike = () => {
        likes = data?.likes.filter(e => e != user?.email)
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

    const handleComment = () => {
        const text = commentInput.current.value
        const email = user?.email
        const picture = user?.picture
        const name = user?.name
        const comment = { text, email, ratting, name, picture }
        comments.push(comment)
        axiosLink.patch(`/blogs/${params.card}`, { comments })
            .then(res => {
                console.log(res);
                if (res.data) {
                    refetch()    
                }
                

            })
            .catch(err => {
                console.log(err);

            })
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
                                <h1 className='text-xl font-bold'>Reviews: <Rating readOnly value={avgRate}></Rating> </h1>
                                <h1 className='text-xl font-bold flex gap-3'>Likes:
                                    {

                                        like == false ?
                                            <button onClick={handleLike}><FavoriteBorderIcon fontSize='large' className='text-3xl -mt-1'></FavoriteBorderIcon></button>
                                            :

                                            <button onClick={handleDislike}> <FavoriteIcon fontSize='large' className=' text-red-500 -mt-1'></FavoriteIcon></button>}
                                    {data?.likes.length}</h1>

                            </div>
                        </div>
                        <div className='flex justify-around p-2'>
                            <div className='w-1/2'>
                                <h1 id='title' className='text-3xl mb-3 font-semibold'>Description</h1>
                                <p className='text-lg font-semibold'>{data?.details}</p>
                            </div>
                            <div className='border-2 w-1/3 p-2'>
                                <h1 id='title' className='text-3xl mb-3 font-semibold'>Comments</h1>
                                <div>
                                    <textarea ref={commentInput} name="" className='p-2 border-2 w-full h-32 rounded-2xl border-black ' id=""></textarea>
                                    {
                                        rate?.map((e, idx) => <button key={idx} onClick={() => setRatting(e)} className='btn mr-2 focus:bg-[#a155d0] focus:text-white'>⭐{e}</button>)
                                    }
                                    <div className='my-2 flex justify-end'>
                                        <button onClick={handleComment} id='button' className='text-white border-2 border-white text-lg font-semibold'>Submit</button>
                                    </div>
                                    <div>
                                        <h1 className='text-2xl font-semibold'>Other Comments</h1>
                                        <div>
                                            {
                                                data?.comments?.length > 0 ?
                                                data?.comments?.map((e, idx) =>
                                                    <div key={idx}>
                                                        <div className='flex justify-between'>
                                                            <div className='flex gap-2'>
                                                                <img className='w-12 h-12 rounded-full object-cover object-top' src={e.picture} alt="" />
                                                                <h1 className='my-auto text-lg font-semibold'>{e.name}</h1>
                                                            </div>
                                                            <div className='my-auto'>
                                                                <Rating readOnly value={e?.ratting} ></Rating>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h1>{e?.text}</h1>
                                                        </div>
                                                    </div>)
                                                    :
                                                    <h1>No Comments</h1>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </section>
    );
};

export default CardDetails;