import React, { useEffect, useState } from 'react';
import { UilMoneyWithdraw } from '@iconscout/react-unicons';
import { UilEstate } from '@iconscout/react-unicons';
import { UilMetro } from '@iconscout/react-unicons';
import Menubar from '../components/menubar';
import '../data';
import { getMonthName } from '../data';
import {useSelector} from 'react-redux'

const Home = () => {
    // const [userData, setUserData] = useState(null);
    const [theDate, setTheDate] = useState("January");
    const basicUserInfo = useSelector((state) => state.user.user)

    useEffect(() => {
        // const fetchUserData = async () => {
        //     try {
        //         const response = await axios.get('http://localhost:5000/api/user');
        //         setUserData(response.data);
        //     } catch (error) {
        //         console.error('Error fetching user data:', error);
        //     }
        // };

        // fetchUserData();
        setTheDate(getMonthName());
    }, []);

    return (
        <section className='flex'>
            <Menubar />
            <section className='mt-2 pl-4 pt-20 '>
                <section className='flex pb-2 gap-10 pr-4'>
                    <article className='w-64 h-40 max-sm:h-36 bg-zinc-900 rounded-3xl text-center text-lg text-white pt-11'>
                        Income:
                        <br />
                        <p className='text-center text-2xl text-white'>6,400</p>
                        {/* {userData.income} */}
                    </article>
                    <article className='w-64 h-40 max-sm:h-36 bg-zinc-900 rounded-3xl text-center text-lg text-white pt-8 max-sm:pt-6'>
                        <p className='text-center text-xl text-white'>{theDate} Budget</p>
                        Available:
                        <br />
                        <p className='text-center text-2xl text-white'>12,000</p>
                        {/* {userData.available} */}
                    </article>
                    <article className='w-64 h-40 max-sm:h-36 bg-zinc-900 rounded-3xl text-center text-lg text-white pt-11'>
                        Expenses:
                        <br />
                        <p className='text-center text-2xl text-white'>5,400</p>
                        {/* - {userData.expenses} */}
                    </article>
                    {/* Your home component content here */}
                </section>
                <section className='w-3/4 h-52 bg-white rounded-[30px] pb-10 text-black px-5 pt-2 rtl'>
                    <p className='text-lg'> Saving plan</p>
                    <p className='font-light mb-1'>Your Goals are within reach, Keep it up!</p>

                    <section className='grid gap-6 max-sm:gap-2 grid-cols-2 max-sm:grid-cols-1'>
                        <aside className='inline-block w-96 h-24 bg-zinc-300 bg-opacity-30 rounded-3xl px-2 py-2'>
                            <article className='flex-col'>
                                <p className=' '>
                                    <span className='flex items-center'>
                                        <UilMoneyWithdraw className='mr-4' />
                                        Save 3000
                                    </span>
                                </p>
                            </article>
                            <p className='ml-72'>3000</p>
                            <div className="w-[289px] h-2 bg-amber-400 rounded-[15px] ml-6" />
                            <div className="flex">
                                <p className="ml-4 text-black">Accumulated 2,000</p>
                                <p className="text-black font-light ml-28">left 1,000</p>
                            </div>
                        </aside>
                        <aside className='inline-block w-96 h-24 bg-zinc-300 bg-opacity-30 rounded-3xl ml-12 px-2 py-2'>
                            <article className='flex-col'>
                                <p className=''>
                                    <span className='flex items-center'>
                                        <UilMoneyWithdraw className='mr-4' />
                                        Buy MacBook Pro 16
                                    </span>
                                </p>
                            </article>
                            <p className='ml-72'>6000</p>
                            <div className="w-[289px] h-2 bg-orange-400 rounded-[15px] ml-6" />
                            <div className="flex">
                                <p className="ml-4 text-black">Accumulated 2,000</p>
                                <p className="text-black font-light ml-28">left 4,000</p>
                            </div>
                        </aside>
                    </section>
                    <button className='ml-[700px] mt-2 bg-zinc-300 p-1 rounded-lg text-sm'>Add Goal</button>
                </section>
                <section className='w-[846px] h-72 bg-white rounded-3xl mt-2 pt-1 pl-2 overflow-y-auto'>
                    <p className='pb-2'> My recent transactions</p>
                    <article className='flex-col'>
                        <p className='pl-2 pb-2'>
                            <span className='flex items-center gap-2'>
                                <UilEstate className='mt-2' size={30} />
                                Rent
                                yesterday - 12:00
                            </span>
                        </p>
                        <p className="font-normal ml-[700px]">1,200</p>
                        <div className="w-[791px] h-[0px] border border-black ml-2"></div>
                    </article>
                    <article className='flex-col'>
                        <p className='pl-2 pb-1'>
                            <span className='flex items-center gap-2'>
                                <UilEstate className='mt-2' size={30} />
                                Electricity
                                Tuesday - 10:00
                            </span>
                        </p>
                        <p className="font-normal ml-[700px]">100</p>
                        <div className="w-[791px] h-[0px] border border-black ml-2"></div>
                    </article>
                    <article className='flex-col'>
                        <p className='pl-2 pb-1'>
                            <span className='flex items-center gap-2'>
                                <UilMoneyWithdraw className='mt-2' size={30} />
                                Add to savings
                                28/04 - 10:00
                            </span>
                        </p>
                        <p className="font-normal ml-[700px]">10</p>
                        <div className="w-[791px] h-[0px] border border-black ml-2"></div>
                    </article>
                    <article className='flex-col'>
                        <p className='pl-2 pb-1'>
                            <span className='flex items-center gap-2'>
                                <UilMetro className='mt-2' size={30} />
                                Petrol
                                20/04 - 09:00
                            </span>

                        </p>

                    </article>


                    {/* get recent transcations from api  */}
                </section>
            </section >
        </section>
    );
}

export default Home;
