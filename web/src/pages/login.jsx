import React from 'react';
import { useForm } from 'react-hook-form';


const LoginPage = () => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <section>
            {/* Your login page content goes here */}
        </section>
    );
};

export default LoginPage;
