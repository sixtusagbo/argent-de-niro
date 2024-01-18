import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/button';
import { redirect } from 'react-router-dom';
import ToggleEntry from '../components/toggleEntry';
import axios from 'axios';


const SignupPage = () => {
    // Add your signup logic here
    // const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    // const { errors } = formState;

    const onSubmit = async (data) => {
        // try {
        //     const response = await axios.post('http://localhost:3000/api/signup', {
        //         fullname: data.fullname,
        //         email: data.email,
        //         password: data.password,
        //     });

        //     console.log(response.data);

        //     // Redirect to login page
        //     window.location.href = '/login';
        // } catch (error) {
        //     console.error(error);
        // }
        console.log(response.data);
        window.location.href = '/login';
    };

    return (
        // <section >
        //     <section className='w-10/12 h-10/12 rounded-r-xl'>
        <section className='bg-[#90EB88] h-screen w-full flex items-center place-content-center'>

            <section className=' mb-96'>
                <ToggleEntry />
            </section>

            <form onSubmit={handleSubmit(onSubmit)} >
                <label htmlFor='fullname'>
                    <input
                        className='bg-white rounded-2xl pl-8 py-2 my-3 w-full outline-none'
                        type='text'
                        name='fullname'
                        placeholder='Full Name'
                        {...register('fullname',
                            {
                                required: {
                                    value: true,
                                    message: "Full name is required",
                                },
                                minLength: {
                                    value: 2,
                                    message: "Full name must be at least 2 characters",
                                },
                                maxLength: {
                                    value: 30,
                                    message: "Full name must not exceed 30 characters",
                                },
                            })}
                    />

                </label>
                {/* <span className='hidden sm:inline-block text-sm ml-3 my-0 text-red-600'>{errors.fullname?.message}</span> */}

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
                                pattern: {
                                    value:
                                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: "Invalid email format"
                                },
                            })}
                    />
                    {/* <span className='text-sm ml-3 text-red-600'>{errors.email?.message}</span> */}
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
                                pattern: {
                                    value:
                                        /^(?=.*[A-Z])(?=.*[!@#$&*^%()~`])(?=.*[0-9]).{8,}$/,
                                    message: "Must contain: 1 special charceter, a capital letter and a number"
                                },
                            })}
                    />
                    {/* <span className='text-sm ml-3 text-red-600'>{errors.password?.message}</span> */}
                </label>
                <section className='flex flex-col mx-16 ml-28 sm:ml-48'>
                    <Button intent='welcoming' label='Sign Up' />
                </section>
                <p className='text-center'>Already have an acccount? Login</p>

            </form>
        </section>

        //     </section>
        // </section>
    );
}

export default SignupPage;
