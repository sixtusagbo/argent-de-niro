import React from 'react';

import { useHistory } from 'react-router-dom';

const ToggleEntry = () => {
    const history = useHistory();

    const handleArticleClick = (textName) => {
        history.push(`/text/${textName}`);
    };

    return (
        <section className='bg-white rounded-lg'>
            <article
                className={`w-1/2 text-black hover:cursor-pointer focus:bg-emerald-100 active:bg-emerald-400 bg-white`}

                onClick={() => handleArticleClick('log-in')}
            >
                log in
            </article>
            <article
                className={`w-1/2 text-black hover:cursor-pointer focus:bg-emerald-100 active:bg-emerald-400 bg-white`}

                onClick={() => handleArticleClick('sign-up')}
            >
                sign up
            </article>
        </section>
    );
};

export default ToggleEntry;
