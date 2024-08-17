"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { } from "./register.css";
import { FcGoogle } from 'react-icons/fc';
import useAuth from './useAuth';
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import Swal from 'sweetalert2'

const Registration = () => {
    const [Email, setEmail] = useState("");
    const [modal, setModal] = useState(false);
    const confirmCode = useRef()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)

        const Attributes = [
            new CognitoUserAttribute({
                Name: "picture",
                Value: "https://i.ibb.co/c64L2sJ/432044893-1400818297981947-8508382469092611163-n.jpg"
            }),
            new CognitoUserAttribute({
                Name: "name",
                Value: data?.name
            }),
            new CognitoUserAttribute({
                Name: "email",
                Value: data?.email
            })
        ]

        const email = data?.email
        const name = data?.name
        const password = data?.password


        // console.log(modal);
        if (email && password) {
            useAuth.signUp(email, password, Attributes, null, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                    setEmail(data?.email)
                    setModal(true)


                }
            })
        }

    };
    const handleRegister = () => {

        document.getElementById("login-from").style.transform = "rotateY(0deg)"
        document.getElementById("registration-from").style.transform = "rotateY(180deg)"
    }


    const user = useAuth.getCurrentUser()
    if (user) {
        user.getSession((err, res) => {
            if (err) {
                console.log(err);
            }
            console.log(res);
        })
    }
    // console.log(user);
    // console.log(userAtttributes);

    const handleConfirmRegistration = (e) => {
        console.log(Email);
        e.preventDefault()
        // var cognitoUser = new CognitoUser(userData);
        const code = confirmCode.current.value
        console.log(typeof (code));
        const users = new CognitoUser({
            Pool: useAuth,
            Username: Email
        })
        users.confirmRegistration(code, true, (err, res) => {
            if (err) {
                console.log(err);
            }
            if (res) {
                Swal.fire({
                    title: "Registration Complete",
                    text: "You successfully registration your account",
                    icon: "success"
                });
                setModal(false)
            }
        })
    }



    return (
        <section>
            <div id='registration-from' className='border-2 rounded-2xl backdrop-blur-md backdrop-brightness-90 w-1/3 p-2 h-[510px]  my-auto absolute left-1/3 top-14'>

                <h1 className='text-3xl font-bold text-center my-5'>Please Registration for account</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-2 '>
                    {/* register your input into the hook by invoking the "register" function */}
                    <div className='w-8/12 mx-auto'>
                        <label className='font-semibold text-lg'>Your Name</label> <br />
                        <input className='border-2 w-80 border-black p-1 rounded-xl' defaultValue="" {...register("name")} />
                    </div>
                    <div className=' w-8/12 mx-auto'>
                        <label className='font-semibold text-lg'>Your Email</label> <br />
                        <input className='border-2 w-80 border-black p-1 rounded-xl' defaultValue="" {...register("email")} />
                    </div>
                    <div className=' w-8/12 mx-auto'>
                        <label className='font-semibold text-lg'>Upload Your Image</label> <br />
                        <input className='border-2 w-80 border-black p-1 rounded-xl' type='file' defaultValue="" {...register("image")} />
                    </div>

                    {/* include validation with required or other standard HTML validation rules */}
                    <div className=' w-8/12 mx-auto'>
                        <label className='font-semibold text-lg'>Your Password</label> <br />
                        <input className='border-2 w-80 border-black p-1 rounded-xl' {...register("password", { required: true })} />
                    </div>
                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && <span>This field is required</span>}
                    <div className='flex justify-end mr-5'>
                        <button onClick={handleRegister} className=' font-bold'>New User ??</button>
                    </div>
                    <div className='text-center'>
                        <input className='btn' type="submit" />
                    </div>
                </form>
            </div>
            {
                modal == true ?
                    <div className='bg-transparent backdrop-blur-sm w-full hero-overlay absolute h-screen top-0'>
                        <div className='text-lg font-semibold relative space-y-1 w-1/3 text-center mx-auto p-5 rounded-2xl top-1/3 bg-white'>
                            <div className='flex justify-end'>
                                <button onClick={() => setModal(false)}>X</button>
                            </div>
                            <p className=''>Please check your email address to verify email.</p>
                            <input ref={confirmCode} type="text" className='border-2 mr-5 rounded-2xl p-1 border-b' />
                            <button onClick={handleConfirmRegistration} className='btn btn-sm'>Confirm Code</button>
                        </div>
                    </div>
                    :
                    ""
            }
        </section>
    );
};

export default Registration;