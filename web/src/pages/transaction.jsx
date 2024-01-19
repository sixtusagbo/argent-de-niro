import React from 'react';
import { useForm } from 'react-hook-form';

const Transactions = () => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='email'>
                <input
                    className='bg-white rounded-2xl pl-8 py-2 my-2 w-full outline-none'
                    type='email'
                    name='email'
                    placeholder='Email'
                    {...register('email',
                    )}
                />
            </label>
            {/* Form fields */}
        </form>
    );
};

export default Transactions;
