import axios from "axios";
import React, {useEffect, useState} from 'react';
import { UilUsdCircle } from '@iconscout/react-unicons';
import { UilPlusCircle } from '@iconscout/react-unicons';

const GoalsActive = ({goals}) => {

    const [userGoals, setUserGoals] = useState(null);
    // useEffect(async () => {
    //     const availableGoals = await axios.get('http://127.0.0.1/api/v1/goals');
    //     setUserGoals(availableGoals.data);
    //     console.log(goals);
    // }, [goals]);

    const handleAddGoal = () => {
        console.log('Add a new goal');
    }

    if (userGoals){
            userGoals.map((goal) => {
                if (goals === 'active'){
                    if (goal.status === 'active') {
                        return (
                            <section className='flex jusitfy-center content-center justify-items-center w-11/12 rounded-xl bg-white p-2 grid-col-4 gap-2'>
                                <h1 className='pl-2 text-xl pb-2'>Active Goals</h1>
                                <section className='bg-[#D9D9D9] border-none flex flex-col rounded-2xl p-2 place-items-center cursor-pointer w-1/4 max-md:w-full h-28' >
                                    <UilUsdCircle className='text-xl'/>
                                    <p>{goal.name}</p>
                                    <p>{goal.date}</p>
                                </section>
                                <section className='flex flex-col bg-[#D9D9D9] border-2 border-black border-dashed rounded-2xl p-2 place-items-center cursor-pointer w-1/4 max-md:w-full h-28 pt-4' onClick={handleAddGoal}>
                                    <UilPlusCircle className='text-3xl' size={45}/>
                                    <p>Add a new goal</p>
                                </section>
                            </section>
                        )
                    }
                } else {
                    if (goal.status === 'completed') {
                        return (
                            <section className='flex jusitfy-center content-center justify-items-center w-11/12 rounded-xl bg-white p-2 grid-col-4 gap-2'>
                                <h1 className='pl-2 text-xl pb-2'>Completed Goals</h1>
                                <section className='bg-[#D9D9D9] border-none flex flex-col rounded-2xl p-2 place-items-center cursor-pointer w-1/4 max-md:w-full h-28 ' >
                                    <UilUsdCircle className='text-xl'/>
                                    <p>{goal.name}</p>
                                    <p>{goal.date}</p>
                                </section>
                            </section>
                        )
                    }
                }
                
            })
    }
    return (
        <section className='flex jusitfy-center content-center justify-items-center w-11/12 rounded-xl bg-white p-2 grid-col-4 gap-2'>
            <section className='flex flex-col bg-[#D9D9D9] border-2 border-black border-dashed rounded-2xl p-2 place-items-center cursor-pointer w-1/4 max-md:w-full h-28 pt-4' onClick={handleAddGoal}>
                <UilPlusCircle className='text-3xl' size={45}/>
                <p>Add a new goal</p>
            </section>
        </section>
    );
    
}

export default GoalsActive;