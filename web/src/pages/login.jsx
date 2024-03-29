import React from 'react';
import { useForm } from 'react-hook-form';
import ToggleEntry from '../components/toggleEntry';
import Button from '../components/button';
// import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // Existing code...

    const onSubmit =  (data) => {
        // const loginFormData = new FormData();
        // loginFormData.append('email', data.email);
        // loginFormData.append('password', data.password);
        // let credenntials = {};
        // try {
        //     const user = await axios.get('http://localhost:5000/api/v1/login', loginFormData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });
        //     credentials.
        // );
        //     const userId = response.data.userId; // Assuming the API response contains the user ID
        //     console.log(userId);
        //     // Handle the response data here
        // } catch (error) {
        //     console.error(error);
        //     // Handle the error here
        window.location.href = `/home`;
    }

    return (
        <section className='bg-[#90EB88] h-screen w-full '>
            <section className='w-2/4 mx-auto bg-[#90EB88] pt-24'>

                <button className='bg-white rounded mt-16 max-sm:ml-20 sm:ml-44 py-2 px-12'>log in</button>
                <button className='bg-white rounded py-2 px-12'>sign up</button>

                <section className='bg-[#90EB88]  flex items-center justify-center'>


                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor='email' className='block font-medium leading-6 text-gray-900'>
                            <input
                                className='bg-white rounded-2xl pl-8 pr-8 py-2 my-3 w-full outline-none'
                                type='email'
                                name='email'
                                placeholder='Email'
                                {...register('email',
                                    {
                                        required: {
                                            value: true,
                                            message: "Email address is required",
                                        },
                                    })}
                            />
                            <span className='text-sm ml-3 text-red-600'>{errors.email?.message}</span>
                        </label>
                        <label htmlFor='password' className='block font-medium leading-6 text-gray-900'>
                            <input
                                className='bg-white rounded-2xl pl-8 pr-8 py-2 my-3 w-full outline-none'
                                type='password'
                                name='password'
                                placeholder='Password'
                                {...register('password',
                                    {
                                        required: {
                                            value: true,
                                            message: "Password is required",
                                        },
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters",
                                        },
                                    })}
                            />
                            <span className='text-sm ml-3 text-red-600'>{errors.password?.message}</span>
                        </label>
                        <section className='md:ml-10'>
                            <Button intent='welcoming' label='Log in' />
                        </section>
                        <p className='text-center'>Create an account. Sign Up!</p>
                    </form>
                </section>
            </section>
        </section>
    );

};

export default LoginPage;
