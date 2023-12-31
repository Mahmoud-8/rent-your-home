'use client';

import axios from 'axios';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginModal';
import Model from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import {toast} from 'react-hot-toast';
import Button from '../Button'; 
import { signIn } from 'next-auth/react';



const RegisterModal = () => {
    const RegisterModal = useRegisterModal();
    const loginModal = useLoginModal();
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


        axios.post('/api/register', data)
        .then(() => {
            toast.success('Account created successfully');
            RegisterModal.onClose();
            loginModal.onOpen();
        })
            .catch((error) => {
                toast.error('some thing went wrong')

            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const toggle = useCallback(() => {
        RegisterModal.onClose();
        loginModal.onOpen();
      }, [loginModal, RegisterModal])
    

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
                register={register}
                errors={errors}
                required
                />
        </div>
    )
    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
            outline
            label='Continue with Google'
            icon={FcGoogle}
            onClick={() => signIn('google')} />
            
             <Button
            outline
            label='Continue with Github'
            icon={AiFillGithub}
            onClick={() => signIn('github')} />

            <div className=' text-neutral-500 text-center mt-4 
             font-light'>
                <div className='justify-center flex flex-row 
                 items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={toggle} 
                     className='text-neutral-800 cursor-pointer 
                      hover:underline'>
                       Log in
                    </div>
                </div>
            </div>
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
            footer={footerContent}
        />
    );
}
export default RegisterModal;