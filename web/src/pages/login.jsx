import { useForm } from 'react-hook-form';
import Button from '../components/button';
import { axiosForm } from '../data';
import ToggleEntry from '../components/toggleEntry';
// import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // Existing code...

    const onSubmit = async (data) => {
        const loginFormData = new FormData();
        loginFormData.append('email', data.email);
        loginFormData.append('password', data.password);
        try {
            const response = await axiosForm.post('/users', loginFormData);
            console.log(response);

            console.log(loginFormData);
            console.log("It went through");
            // // Redirect to dashboard
            // window.location.href = '/login';
        } catch (error) {
            console.error(error);
        }
        // Handle the error here
        window.location.href = `/dashboard`;
    }

    return (
        <section className='bg-[#43534D] h-screen w-full pt-24 max-lg:px-2'>
            <section className='max-w-xl mx-auto flex flex-col bg-[#90EB88] pb-4 pt-8 justify-center align-center rounded-2xl'>

                <ToggleEntry/>
                <section className='bg-[#90EB88]  flex items-center justify-center pt-4'>

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
                        <section className='flex justify-center'>
                            <Button intent='welcoming' label='Log In' />
                        </section>
                        <p className='text-center'>Create an account. <a href='/signup' className='cursor-pointer text-gray-700'>Sign Up!</a></p>
                    </form>
                </section>
            </section>
        </section>
    );

};

export default LoginPage;
