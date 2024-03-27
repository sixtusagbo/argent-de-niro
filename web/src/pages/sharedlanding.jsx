import React from 'react';
import { Outlet } from 'react-router-dom';

const SharedLanding = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default SharedLanding;
