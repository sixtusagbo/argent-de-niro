import React, { useState } from 'react';
import { UilSearch } from '@iconscout/react-unicons'

const SearchBar = () => {
    const [value, setValue] = useState('');

    return (
        <section className='p-7 relative max-lg:ml-3 ml-44'>
            <label className='relative block h-full w-full'>
                <UilSearch size={24} className="absolute top-1/2 transform -translate-y-1/2 left-3" />
                <input className="bg-zinc-300 rounded-lg pl-8 ml-2 w-full outline-none" type="text" placeholder="Search..." onChange={(e) => { setValue(e.target.value) }} />
            </label >
        </section>

    );
};

export default SearchBar;
