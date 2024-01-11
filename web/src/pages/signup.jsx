import React from 'react';
import { useForm } from 'react-hook-form';

const SignupPage = () => {
    // Add your signup logic here
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <section>
            {/* Add your signup form here */}
        </section>
    );
}

export default SignupPage;
