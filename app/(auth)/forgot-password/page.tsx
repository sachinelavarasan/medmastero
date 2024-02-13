'use client';

import { InputWithLabel } from '@/components/InputWithLabel';
import RedirectLink from '@/components/RedirectLink';
import { Button } from '@/components/ui/button';
import { useThemeData } from '@/utils/hooks/useThemeData';
import Image from 'next/image';
import ForgotPasswordIcon from '@/public/icons/forgot-password.svg';

export default function ForgotPassword() {
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
        <Image
          src={ForgotPasswordIcon}
          alt="!"
          className="h-24 w-full md:h-[50px] md:w-[300px] mt-4"
          placeholder="empty"
        />
        <h2 className="text-[28px] font-bold text-[#000000] dark:text-[#FFFFFF] md:text-[20px] pt-8">
          Forgot Password
        </h2>
        <p className="text-[#777777] dark:text-[#C3C3C3] text-center text-[16px] font-semibold pt-2 pb-10 md:text-[14px] max-w-md">
          Enter your email or phone number and we’ll send you an otp to reset your password
        </p>
        <div className="w-full mt-5">
          <InputWithLabel
            label="Email or Phone Number"
            type="email"
            placeholder="Enter your email or phone number"
            id="email-or-phone-number"
          />
        </div>
        <RedirectLink
          href="/reset-password"
          LinkText="Already having an OTP to reset your password ?"
          className="mt-5 w-full"
        />
        <Button className="w-full mt-5">Reset Password</Button>
        <div className="w-full flex justify-between items-center mt-5">
          <p className="text-[#787878] dark:text-[#C3C3C3] font-bold text-[12px]">
            Already have an account ?
          </p>
          <RedirectLink href="/login" LinkText="Sign In" />
        </div>
      </div>
    </div>
  );
}
