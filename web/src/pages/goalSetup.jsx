import React from 'react';
import {useForm} from 'react-hook-form';
import Button from '../components/button';
import Menubar from '../components/menubar';
import { UilArrowLeft } from '@iconscout/react-unicons';
import { axiosForm } from '../api/axios';
import AlertComponent from '../components/alert';


const GoalForm = () => {
    const { register, handleSubmit } = useForm();

    const arrowClick = () => {
        window.location.href = '/goals';
    }

    const onSubmit = async (data) => {
        const goals = new FormData();
        goals.append('name', data.goalName);
        goals.append('target', data.goalAmount);
        goals.append('start_date', new Date(data.startDate).toISOString());
        goals.append('desired_date', new Date(data.endDate).toISOString());

        try {
            const response = await axiosForm.post('/goals', goals);
            if(response.status === 201){
                <AlertComponent status='success' type='Goal'/>
            } else {
                <AlertComponent status='error' type='Goal'/>
            }
            window.location.href = '/goals';
        } catch (error) {
            console.error(error);
            <AlertComponent status='error' type='Goal'/>
        }
    }

    return(
        <section className=' flex'>
            <Menubar/>
            <section className='mt-2 pt-20 w-full '>
                    <aside className='flex '>
                        <UilArrowLeft onClick={arrowClick} className='pt-2 pl-2 cursor-pointer mr-4' size={35}/>
                        <h1 className='py-2 text-2xl text-center ml-96 max-lg:ml-20'>Add a new Goal</h1>
                    </aside>
                <section className=' w-11/12 flex flex-col content-center items-center place-items-center'>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full pl-16'>
                        <label htmlFor='goalName' className='block font-medium leading-6 text-black pb-2'>
                            <input type='text' id='goalName' name='goalName'
                            className=' rounded-2xl pl-8 pr-8 py-2 my-3 w-11/12 outline-none bg-slate-300'
                            placeholder='Goal Name'
                            {...register('goalName', { required: true })}
                            />
                        </label >
                        <label htmlFor='goalAmount' className='block font-medium leading-6 text-black pb-2'>
                            <input type='number' id='goalAmount' name='goalAmount'
                            className='rounded-2xl pl-8 pr-8 py-2 my-3 w-11/12 outline-none bg-slate-300'
                            placeholder='Target Amount'
                            {...register('goalAmount', { required: true })}
                            />
                        </label>
                        <label htmlFor='startDate' className='block font-medium leading-6 pb-2'>
                            <input type='date' id='startDate' name='startDate'
                            className='rounded-2xl pl-8 pr-8 py-2 my-3 w-11/12 outline-none bg-slate-300'
                            placeholder='Start Date'
                            {...register('startDate', { required: true })}
                            />
                        </label>
                        <label htmlFor='endDate' className='block font-medium leading-6 pb-2'>
                            <input type='date' id='endDate' name='endDate'
                            className='rounded-2xl pl-8 pr-8 py-2 my-3 w-11/12 outline-none bg-slate-300'
                            placeholder='End Date'
                            {...register('endDate', { required: true })}
                            />
                        </label>
                        <aside className='flex justify-center  w-full'>
                            <Button intent='adding' label='Create'/>
                        </aside>
                    </form>
                </section>
                
            </section>
        </section>
    )
}

export default GoalForm;