import React from 'react';
import { useForm } from 'react-hook-form';
import ToggleEntry from '../components/toggleEntry';
import Button from '../components/button';
// import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // Existing code...

    const onSubmit = async (data) => {
        // try {
        //     const response = await axios.post('http://localhost:5000/api/v1/login', data);
        //     const userId = response.data.userId; // Assuming the API response contains the user ID
        //     console.log(userId);
        //     // Handle the response data here
        // } catch (error) {
        //     console.error(error);
        //     // Handle the error here
        window.location.href = `/dashboard`;
    }

    return (
        <section className='bg-[#90EB88] h-screen w-full flex items-center place-content-center'>
            <section className='mb-96 mr-20'>
                <ToggleEntry />
            </section>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='email'>
                    <input
                        className='bg-white rounded-2xl pl-8 py-2 my-2 w-full outline-none'
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
                <label htmlFor='password'>
                    <input
                        className='bg-white rounded-2xl pl-8 py-2 my-2 w-full outline-none'
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
                <section className='flex flex-col mx-16 ml-28 sm:ml-32'>
                    <Button intent='welcoming' label='Log in' />
                </section>
                <p className='text-center'>Create an account. Sign Up!</p>
            </form>

        </section>
    );

};

export default LoginPage;
