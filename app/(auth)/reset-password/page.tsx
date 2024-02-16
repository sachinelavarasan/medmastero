'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputWithLabel } from '@/components/InputWithLabel';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form';
// import RedirectLink from '@/components/RedirectLink';

import { useThemeData } from '@/utils/hooks/useThemeData';
import { ResetPasswordOtpSchema, ResetPasswordSchema } from '@/utils/schema';
import { commonIcon } from '@/utils/theme-image';

export default function ResetPassword() {
  const [currentTheme] = useThemeData();
  // const { theme } = useTheme();
  const [isVerified, setIsVerified] = useState(false);

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<z.infer<typeof ResetPasswordOtpSchema>>({
    resolver: zodResolver(ResetPasswordOtpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const {
    formState: { errors: passErrors },
    control: passControl,
    handleSubmit: passHandleSubmit,
  } = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  function onSubmitOtp(data: z.infer<typeof ResetPasswordOtpSchema>) {
    alert(JSON.stringify(data, null, 2));
  }

  function onSubmitPassword(data: z.infer<typeof ResetPasswordSchema>) {
    alert(JSON.stringify(data, null, 2));
  }

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
            src={commonIcon.resetPasswordImg}
            alt="!"
            className="h-20 w-full md:h-[50px] md:w-[300px] mt-4"
            placeholder="empty"
          />
          <h2 className="text-[28px] font-bold text-[#000000] dark:text-[#FFFFFF] md:text-[20px] pt-4">
            Reset Password
          </h2>
          <p className="text-[#777777] dark:text-[#C3C3C3] text-center text-[14px] font-semibold py-2 md:text-[14px] max-w-sm">
            We have sent an OTP number to you email or Phone number
          </p>
          <form onSubmit={handleSubmit(onSubmitOtp)} className="w-full">
            <div className="flex w-full items-center mt-4">
              <FormField
                control={control}
                name="otp"
                render={({ field }) => (
                  <InputWithLabel
                    {...field}
                    label="OTP"
                    type="text"
                    placeholder="Enter your OTP"
                    id="otpnumber-signup"
                    error={!!errors?.otp}
                    errorMessage={errors?.otp?.message}
                    disabled={isVerified}
                  />
                )}
              />
              {isVerified ? (
                <div className="flex ml-4 h-full items-center justify-end w-2/5 ">
                  <Image
                    src={currentTheme.successTickIcon}
                    alt="!"
                    className="h-5 w-5"
                    placeholder="empty"
                  />
                  <div className="ml-1.5 text-[#00BBA8] font-semibold">Verified</div>
                </div>
              ) : null}
            </div>
            {!isVerified ? (
              <Button
                className="w-full mt-1"
                onClick={() => setIsVerified(!isVerified)}
                type="submit">
                Verify
              </Button>
            ) : null}
          </form>
          <form onSubmit={passHandleSubmit(onSubmitPassword)} className="w-full">
            {isVerified ? (
              <div className="w-full">
                <div className="mt-1 w-full">
                  <FormField
                    control={passControl}
                    name="password"
                    render={({ field }) => (
                      <InputWithLabel
                        {...field}
                        label="Password"
                        type="password"
                        placeholder="New password"
                        id="password-reset"
                        error={!!passErrors?.password}
                        errorMessage={passErrors?.password?.message}
                      />
                    )}
                  />
                </div>
                <div className="mt-1 w-full">
                  <FormField
                    control={passControl}
                    name="confirm_password"
                    render={({ field }) => (
                      <InputWithLabel
                        {...field}
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm password"
                        id="confirm-password-reset"
                        error={!!passErrors?.confirm_password}
                        errorMessage={passErrors?.confirm_password?.message}
                      />
                    )}
                  />
                </div>
                <Button className="w-full mt-2" type="submit">
                  Update Password
                </Button>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
