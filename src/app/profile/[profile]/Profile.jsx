'use client'
import React, { use, useContext, useEffect, useState } from 'react';
import UserPost from './UserPost';
import useFetch1 from '@/app/Hooks/useFetch1';
import { ContextSource } from '@/app/ContextAPI/ContextAPI';
import useAxios, { AxiosSource } from '@/app/Hooks/useAxios';

const Profile = ({ id }) => {
    const [data, refetch] = useFetch1('users', id?.profile)
    const [userID, setuserID] = useState(null);
    const { user } = useContext(ContextSource)
    const axiosLink = useAxios(AxiosSource)

    console.log(data);


    if (user) {
        axiosLink.get(`/users?data=${user?.email}`)
            .then(res => {
                setuserID(res.data._id)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleFollowing = (idx) => {

        if (user?.email) {
            axiosLink.patch(`/following/${userID}`, { idx })
                .then(res => {
                    // console.log(res);
                    refetch()
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            alert('Please login to follow')
        }
    }

    const handleUnfollow = (idx) => {
        if (user?.email) {
            axiosLink.patch(`/unfollow/${userID}`, { idx })
                .then(res => {
                    console.log(res);
                    refetch()
                })

                .catch(err => {
                    console.log(err);
                })

        }
        else {
            alert('Please login to unfollow')
        }
    }

    return (
        <section>
            <div className=''>
                <img className='w-full h-[30rem]  object-cover object-bottom opacity-90' src="https://res.cloudinary.com/daudgshta/image/upload/v1726591886/travelProfile_vslue8.jpg" alt="" />

            </div>
            <div className='w-10/12 mx-auto rounded-xl p-5 h-[700px] relative bg-gray-200 -mt-52 flex gap-10  border-2'>
                <div className='w-1/3 border-2 bg-white h-full p-3 rounded-xl'>
                    {
                        data == "l" ?
                            "loading"
                            :
                            <div className='text-center'>
                                <img className='w-56 mx-auto h-56 rounded-full object-cover object-top' src={data?.Image} alt="" />
                                <h1 className='text-xl font-bold my-3'>{data?.Name}</h1>
                                <div>
                                    {

                                        user?.email.includes(id.profile) ?
                                            ""
                                            :
                                            data?.Followers.find(e => e._id == userID) ?
                                                <button onClick={() => handleUnfollow(data?._id)} id='button' className='font-bold p-1'>Following</button>
                                                :
                                                <button onClick={() => handleFollowing(data?._id)} id='button' className='font-bold p-1'>Follow</button>
                                    }
                                </div>
                                <div className='gap-5 flex justify-center my-2 '>
                                    <button className='font-bold'>{data?.Followers.length > 0 ? data?.Followers.length : 0} Followers</button>
                                    <button className='font-bold'>{data?.Followings.length > 0 ? data?.Followings.length : 0}  Following</button>

                                </div>
                            </div>
                    }
                </div>
                <div className='w-2/3 bg-white p-5 rounded-xl'>
                    <UserPost email={data?.Email} name={data?.Name} image={data?.Image}></UserPost>
                </div>
            </div>
        </section>
    );
};

export default Profile;