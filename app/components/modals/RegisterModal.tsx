'use client';

import axios from 'axios';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from 'react';
import {
    FieldValues, SubmitHandler, useForm
} from 'react-hook-form';
import useRegisterModal from '../hooks/useRegisterModal';
import Model from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';



const RegisterModal = () => {
    const RegisterModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register, handleSubmit, formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data).then(() => {
            RegisterModal.onClose();
        })
            .catch((error) => {
                console.log(error);

            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome to Airbnb'
                subtitle='Create an account!'
                center />
                <Input 
                id='email'
                label='Email'
                disabled={isLoading}
                required
                register={register}
                errors={errors}
                />
                  <Input 
                id='name'
                label='Name'
                disabled={isLoading}
                required
                register={register}
                errors={errors}
                />
                  <Input 
                id='password'
                type='password'
                label='Password'
                disabled={isLoading}
                required
                register={register}
                errors={errors}
                />

        </div>
    )

    return (
        <Model
            disabled={isLoading}
            isOpen={RegisterModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={RegisterModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    );
}

export default RegisterModal;