'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { InputWithLabel } from '@/components/InputWithLabel';
import RedirectLink from '@/components/RedirectLink';
import { Button } from '@/components/ui/button';

import { useThemeData } from '@/utils/hooks/useThemeData';

import ResetPasswordIcon from '@/public/icons/reset-password.svg';
import VerifiedIconDark from '@/public/icons/success-dark.svg';
import VerifiedIconLight from '@/public/icons/success-light.svg';

export default function ResetPassword() {
  const [currentTheme] = useThemeData();
  const { theme } = useTheme();
  const [isVerified, setIsVerified] = useState(false);
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex items-center justify-center flex-col dark:bg-[#0C1615] bg-[#FFFFFF] p-3 rounded-[16px] shadow-md">
        <div className="flex flex-col items-center p-6">
          <Image
            src={currentTheme?.authIcon}
            alt="auth icon"
            className="h-[70px] w-full md:h-[50px] md:w-[300px]"
            placeholder="empty"
          />
          <Image
            src={ResetPasswordIcon}
            alt="!"
            className="h-20 w-full md:h-[50px] md:w-[300px] mt-4"
            placeholder="empty"
          />
          <h2 className="text-[28px] font-bold text-[#000000] dark:text-[#FFFFFF] md:text-[20px] pt-4">
            Reset Password
          </h2>
          <p className="text-[#777777] dark:text-[#C3C3C3] text-center text-[16px] font-semibold py-2 md:text-[14px] max-w-sm">
            We have sent an OTP number to you email or Phone number
          </p>

          <div className="flex w-full mt-4">
            <InputWithLabel
              label="OTP"
              type="number"
              placeholder="Enter your OTP"
              id="otpNumber"
              // className={isVerified ? 'w-3/5': 'w-full'}
            />
            {isVerified ? (
              <div className="flex ml-4 items-center justify-end w-2/5 mt-4">
                <Image
                  src={theme == 'dark' ? VerifiedIconDark : VerifiedIconLight}
                  alt="!"
                  className="h-5 w-5"
                  placeholder="empty"
                />
                <div className="ml-1.5 text-[#008778] font-bold">Verfied</div>
              </div>
            ) : null}
          </div>
          {!isVerified ? (
            <Button className="w-full mt-6" onClick={() => setIsVerified(!isVerified)}>
              Verify
            </Button>
          ) : null}
          {isVerified ? (
            <div className="w-full">
              <div className="mt-4 w-full">
                <InputWithLabel
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                />
              </div>
              <div className="mt-4 w-full">
                <InputWithLabel
                  label="Confirm Password"
                  type="password"
                  placeholder="Enter your confirm password"
                  id="confirm-password"
                />
              </div>
              <Button className="w-full mt-6">Update Password</Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
