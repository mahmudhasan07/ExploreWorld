'use client'
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from "react-icons/fc";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import useAuth from './useAuth';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import loader from "../../../public/loader-2.json"
import { ContextSource } from '../ContextAPI/ContextAPI';
import { useDispatch, useSelector } from 'react-redux';
import { LogInUser, setValue } from '../components/Redux/ReduxFuntion';


const Login = () => {
    const navigate = useRouter()
    const [success, setSuccess] = useState(false)
    const { setloader } = useContext(ContextSource)
    const dispatch = useDispatch()
    const { complete } = useSelector((state) => state.auth)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        setSuccess(true)
        if (validateCaptcha(data?.code) == true) {
            // console.log(data);

            // console.log("condition");
            // const user = new CognitoUser({
            //     Pool: useAuth,
            //     Username: data?.email
            // })

            // const userDetails = new AuthenticationDetails({
            //     Username: data?.email,
            //     Password: data?.password
            // })

            // user.authenticateUser(userDetails, {
            //     onSuccess: (result) => {
            //         console.log(result);
            //         setSuccess(false)
            //         // setloader(false)
            //         navigate.push("/")
            //     },
            //     onFailure: (err) => {
            //         setSuccess(false)
            //         console.log(err);
            //     }
            // })

            const email = data?.email
            const password = data?.password
            console.log(email, password);

            if (email, password) {
                dispatch(setValue())
                dispatch(LogInUser({ email, password }))
                .then(res=>{
                    if(res?.type == "auth/LoginUser/fulfilled"){
                        setSuccess(false)
                        navigate.push('/')
                    }
                    if(res?.type == 'auth/LoginUser/rejected'){
                        setSuccess(false)
                        alert("Invalid Username or Password")
                    }    
                    
                })
            }



        }
        else {
            setSuccess(false)
            alert("Your Captcha Code is wrong")
        }
    };
    const handleLogin = () => {
        document.getElementById("login-from").style.transform = "rotateY(180deg)"
        document.getElementById("registration-from").style.transform = "rotateY(0deg)"
    }
    useEffect(() => {
        loadCaptchaEnginge(6);
        // const getUser = useAuth.getCurrentUser()
        // console.log(getUser);
    }, []);

    const handleLogOut = () => {
        const user = useAuth.getCurrentUser()
        user.signOut()
    }
    return (
        <section className=''>
            {
                success == true ?
                    <div id='loader_id' className='absolute w-full h-screen top-0 z-50 backdrop-blur-md '>
                        <Lottie animationData={loader} className=' w-[500px] top-1/4 relative mx-auto '></Lottie>
                    </div>
                    :
                    ""
            }
            <div id='login-from' className='border-2 rounded-2xl backdrop-blur-sm backdrop-brightness-90 w-1/3 h-[510px] p-5 my-auto absolute left-1/3 top-[15%]'>

                <h1 className='text-3xl font-bold text-center my-5'>Please Login in your account</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-2 '>
                    {/* register your input into the hook by invoking the "register" function */}
                    <div className=' w-8/12 mx-auto'>
                        <label className='font-semibold text-lg'>Your Email</label> <br />
                        <input className='border-2 w-80 border-black p-1 rounded-xl' type='text' defaultValue="" {...register("email")} />
                    </div>
                    <div className=' w-8/12 mx-auto'>
                        <label className='font-semibold text-lg'>Your Captcha</label> <br />
                        <LoadCanvasTemplate></LoadCanvasTemplate>
                        <input className='border-2 w-80 border-black p-1 rounded-xl' type='text' defaultValue="" {...register("code")} />
                    </div>

                    {/* include validation with required or other standard HTML validation rules */}
                    <div className=' w-8/12 mx-auto'>
                        <label className='font-semibold text-lg'>Your Password</label> <br />
                        <input className='border-2 w-80 border-black p-1 rounded-xl' type='password' {...register("password", { required: true })} />
                    </div>
                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && <span>This field is required</span>}

                    <div className='flex justify-end mr-5'>
                        <button onClick={handleLogin} className=' font-bold'>New User ??</button>
                    </div>
                    <div className='text-center'>
                        <input className='btn' type="submit" />
                    </div>
                </form>
                <div className='mx-auto my-2 w-fit'>
                    <button onClick={handleLogOut} className='border text-xl font-semibold backdrop-blur-2xl text-white flex gap-2 p-2 rounded-xl'>LogIn with Google <FcGoogle className='text-2xl my-auto'></FcGoogle></button>
                </div>

            </div>
        </section>
    );
};

export default Login;