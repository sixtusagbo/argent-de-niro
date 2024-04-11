import React from 'react';

import { redirect } from 'react-router-dom';

const ToggleEntry = () => {
    // const navigate = useNavigate();

    const handleArticleClick = (textName) => {
        window.location.href = `/${textName}`;
        // (`./pages/${textName}.jsx`);
    };
    //
    //0.5rem = 8px
    //1rem = 16px
    //1.5rem = 24px
    //2rem = 32px
    //2.5rem = 40px


    return (
        <ul className='list-none p-0 mt-10 mb-0 ml-4 mr-0 after:table after:clear-both flex flex-row justify-center'>
            <li><a href='/signup' className='p-2 px-12 bg-white cursor-pointer no-underline text-xl text-center text-gray-800 block float-left hover:bg-emerald-100 rounded-l-2xl focus:bg-emerald-400'>sign up</a></li>
            <li><a href='/login' className='p-2 px-12 bg-white cursor-pointer no-underline text-xl text-center text-gray-800 block float-left hover:bg-emerald-100 rounded-r-2xl focus:bg-emerald-400'>log in</a></li>
        </ul>
    );
};

export default ToggleEntry;
