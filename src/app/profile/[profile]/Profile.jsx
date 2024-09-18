'use client'
import React from 'react';
import UserPost from './UserPost';
import useFetch1 from '@/app/Hooks/useFetch1';

const Profile = ({ id }) => {
    const [data, refetch] = useFetch1('users', id?.profile)

    return (
        <section>
            <div className=''>
                <img className='w-full h-[30rem]  object-cover opacity-90' src="https://res.cloudinary.com/daudgshta/image/upload/v1726591886/travelProfile_vslue8.jpg" alt="" />
            </div>
            <div className='w-10/12 mx-auto rounded-xl p-5 h-[700px] relative bg-gray-200 -mt-36 flex gap-10  border-2'>
                <div className='w-1/3 border-2 bg-white h-full p-3 rounded-xl'>
                    {
                        data == "l" ?
                            "loading"
                            :
                            <div className='text-center'>
                                <img className='w-56 mx-auto h-56 rounded-full object-cover object-top' src={data?.Image} alt="" />
                                <h1 className='text-xl font-bold'>{data?.Name}</h1>
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