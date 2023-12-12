'use client';
import { useCallback, useState } from 'react';
import {toast} from 'react-hot-toast';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useRegisterModal from '../hooks/useRegisterModal';
import useLoginModal from '../hooks/useLoginModal';
import Model from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button'; 
import { useRouter } from 'next/navigation';



const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal()
    const RegisterModal = useRegisterModal();

    const [isLoading, setIsLoading] = useState(false);
    const {
        register, handleSubmit, formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log(data);
        
       signIn('credentials', {
        ...data, 
        redirect: false,
       })
       .then((callback) => {
        console.log(callback);
        
        setIsLoading(false);

        if (callback?.ok) {
            toast.success('Logged in');
            router.refresh();
            loginModal.onClose();
        }
        if (callback?.error) {
            toast.error(callback.error);
        }
       })
    }

    const onToggle = useCallback(() => {
        loginModal.onClose();
        RegisterModal.onOpen();
      }, [loginModal, RegisterModal])
    

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome back'
                subtitle='Login to your account!'
                center />
                <Input 
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
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
    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
            outline
            label='Continue with Google'
            icon={FcGoogle}
            onClick={() => signIn('Google')} />
             <Button
            outline
            label='Continue with Github'
            icon={AiFillGithub}
            onClick={() => signIn('github')} />
            <div className=' text-neutral-500 text-center mt-4 
             font- 
             light'>
                <div className='justify-center flex flex-row 
                 items- 
                 center 
                gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={RegisterModal.onClose} 
                     className='text-
                    neutral-800 cursor-pointer hover:underline'>
                       Log in
                    </div>
                </div>

            </div>

        </div>
    )

    return (
        <Model
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal;