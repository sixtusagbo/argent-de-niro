import React from 'react';
import {useForm} from 'react-hook-form';
import Button from './button';

const GoalForm = () => {
    const { register, handleSubmit } = useForm();


    return(
        <section className='w-11/12 rounded-xl bg-white p-2'>
            <form>
                <label htmlFor='goalName'>
                    <input type='text' id='goalName' name='goalName'
                    placeholder='Goal Name'
                    {...register('goalName', { required: true })}
                    />
                </label>
                <label htmlFor='goalAmount'>
                    <input type='number' id='goalAmount' name='goalAmount'
                    placeholder='Target Amount'
                    {...register('goalAmount', { required: true })}
                    />
                </label>
                <label htmlFor='startDate'>
                    <input type='date' id='startDate' name='startDate'
                    placeholder='Start Date'
                    {...register('startDate', { required: true })}
                    />
                </label>
                <label htmlFor='endDate'>
                    <input type='date' id='endDate' name='endDate'
                    placeholder='End Date'
                    {...register('endDate', { required: true })}
                    />
                </label>
                <Button intent='adding' label='Create'/>
            </form>
        </section>
    )
}