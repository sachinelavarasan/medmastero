'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { z } from 'zod';
import { useFormState } from 'react-dom';

import { InputWithLabel } from '@/components/InputWithLabel';
import RedirectLink from '@/components/RedirectLink';
import { FormField } from '@/components/ui/form';
import { ButtonWithLoader } from '@/components/Button';

import { useThemeData } from '@/utils/hooks/useThemeData';
import { LoginSchema } from '@/utils/schema';

import { authenticate } from '@/app/actions/authentication';

export default function Login() {
  const [currentTheme] = useThemeData();
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex items-center justify-center flex-col dark:bg-app_dark_bg bg-[#FFFFFF] p-3 rounded-[16px] shadow-md w-[480px]">
        <div className="flex flex-col items-center p-6 w-full">
          <Image
            src={currentTheme?.authIcon}
            alt="auth icon"
            className="h-[70px] w-full md:h-[50px] md:w-[300px]"
            placeholder="empty"
          />
          <h2 className="text-[28px] font-bold text-[#000000] dark:text-[#FFFFFF] md:text-[20px] pt-2">
            Welcome Back !
          </h2>
          <p className="text-[#777777] dark:text-[#C3C3C3]  text-[14px] font-semibold pt-2 pb-10 md:text-[14px]">
            Sign in to your account here
          </p>

          <form action={dispatch} className="w-full">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <InputWithLabel
                  {...field}
                  label="Email or Phone Number"
                  type="email"
                  placeholder="Email"
                  containerClass="mb-1 w-72 md:w-auto"
                  error={!!errors?.email}
                  errorMessage={errors?.email?.message}
                />
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <InputWithLabel
                  {...field}
                  label="Password"
                  type="password"
                  placeholder="password"
                  error={!!errors?.password}
                  errorMessage={errors?.password?.message}
                />
              )}
            />

            <RedirectLink
              href="/forgot-password"
              LinkText="Forgot Password ?"
              className="mt-5 w-full"
            />
            <ButtonWithLoader
              className="w-full mt-2 font-semibold text-[0.875rem]"
              type="submit"
              label="SIGN IN"
              disabled={!isValid}
              // isLoading
            />
            <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
              {errorMessage && (
                <>
                  <div className="h-5 w-5 text-red-500">!</div>
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </form>

          <div className="w-full flex justify-between items-center mt-5">
            <p className="text-[#787878] dark:text-[#C3C3C3] font-bold text-[12px]">
              Don’t have an account ?
            </p>
            <RedirectLink href="/signup" LinkText="SIGN UP" />
          </div>
        </div>
      </div>
    </div>
  );
}
