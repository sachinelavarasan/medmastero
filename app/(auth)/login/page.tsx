'use client';

import { InputWithLabel } from '@/components/InputWithLabel';
import RedirectLink from '@/components/RedirectLink';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useThemeData } from '@/utils/hooks/useThemeData';
import Image from 'next/image';

export default function Login() {
  const [currentTheme] = useThemeData();
  return (
    <div className="h-full flex items-center justify-center">
      <div className="h-full flex items-center justify-center flex-col">
        <Image
          src={currentTheme?.authIcon}
          alt="auth icon"
          className="h-[70px] w-full md:h-[50px] md:w-[300px]"
          placeholder="empty"
        />
        <h2 className="text-[28px] font-bold text-[#000000] dark:text-[#FFFFFF] md:text-[20px] pt-8">
          Welcome Back !
        </h2>
        <p className="text-[#777777] dark:text-[#C3C3C3]  text-[16px] font-semibold pt-2 pb-10 md:text-[14px]">
          Sign in to your account here
        </p>
        <InputWithLabel
          label="Email or Phone Number"
          type="email"
          placeholder="Email"
          id="email-signin"
          containerClass="mb-4"
        />
        <InputWithLabel label="Password" type="password" placeholder="password" id="email-signin" />
        <RedirectLink
          href="/forget-password"
          LinkText="Forgot Password ?"
          className="mt-5 w-full"
        />
        <Button className="w-full mt-5">Login</Button>
        <div className="w-full flex justify-between items-center mt-5">
          <p className="text-[#787878] dark:text-[#C3C3C3] font-bold text-[12px]">
            Don’t have an account ?
          </p>
          <RedirectLink href="/signup" LinkText="Sign up" />
        </div>
      </div>
    </div>
  );
}
