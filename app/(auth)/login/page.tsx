'use client';

import { InputWithLabel } from '@/components/InputWithLabel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useThemeData } from '@/utils/hooks/useThemeData';
import Image from 'next/image';

export default function Login() {
  const [currentTheme] = useThemeData();
  return (
    <div className='h-full flex items-center justify-center'>
      <div className='h-full flex items-center justify-center flex-col'>
        <Image
          src={currentTheme?.authIcon}
          alt='auth icon'
          className='h-[70px] w-full md:h-[50px] md:w-[300px]'
          placeholder='empty'
        />
        <h2 className='text-[28px] font-bold text-[#000000] dark:text-[#FFFFFF] md:text-[24px] pt-1'>
          Welcome Back !
        </h2>
        <p className='text-[#777777] text-[16px] font-semibold pt-2 pb-10'>
          Sign in to your account here
        </p>
        <InputWithLabel
          label='Email or Phone Number'
          type='email'
          placeholder='Email'
          id='email-signin'
          className='mb-4'
        />
        <InputWithLabel label='Password' type='password' placeholder='password' id='email-signin' />
        <Button className='w-full mt-8'>Login</Button>
      </div>
    </div>
  );
}
