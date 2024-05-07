import { useForm } from 'react-hook-form';
import Button from '../components/button';
import { axiosForm } from '../api/axios';
import ToggleEntry from '../components/toggleEntry';
import { useLocation, useNavigate } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser } from '../app/slices/userSlice';


const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    // const { setAuth } = useAuth();
    // const accessToken = useSelector((state) => state.user.accessToken);
    const user = useSelector((state) => state.user.user);
    // const { setAuth } = useAuth();
    const from = location.state?.from?.pathname || '/home';


    const onSubmit = async (data) => {
        const loginFormData = new FormData();
        loginFormData.append('email', data.email);
        loginFormData.append('password', data.password);

        
        try {
            // const response = await axiosForm.post('/login', loginFormData);
            dispatch(logInUser(loginFormData)).then(() => {
                navigate(from, { replace: true });
            });

            // const auth = { accessToken, user };
            // setAuth(auth);
            
            console.log(user)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className='bg-[#43534D] h-screen w-full pt-24 max-lg:px-2'>
            <section className='max-w-xl mx-auto flex flex-col bg-[#90EB88] pb-4 pt-8 justify-center align-center rounded-2xl'>

                <ToggleEntry />
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
                                autoCapitalize='current-password'
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
