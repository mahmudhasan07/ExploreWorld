import React from 'react';
import loader from '../../../../public/loader-2.json'
import Lottie from 'lottie-react';

const Loader = () => {
    return (
       <div className=''>
         <Lottie animationData={loader} className=' w-[500px]  relative mx-auto '></Lottie>
       </div>
    );
};

export default Loader;