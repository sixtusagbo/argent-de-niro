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
        <section className='bg-white rounded-2xl absolute w-screen sm:w-1/2'>
            <p
                className={`inline-block w-1/2 text-black py-3 text-center rounded-2xl hover:cursor-pointer  hover:bg-emerald-100 active:bg-emerald-400 bg-white`}
                onClick={() => handleArticleClick('login')}
            >
                log in
            </p>
            <p
                className={`inline-block w-1/2 text-black py-3 text-center rounded-2xl hover:cursor-pointer hover:bg-emerald-100 active:bg-emerald-400 bg-white`}
                onClick={() => handleArticleClick('signup')}
            >
                sign up
            </p>
        </section>
    );
};

export default ToggleEntry;
