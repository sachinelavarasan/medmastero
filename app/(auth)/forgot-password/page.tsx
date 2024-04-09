'use client';

import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAction } from 'next-safe-action/hook';

import { InputWithLabel } from '@/components/InputWithLabel';
import RedirectLink from '@/components/RedirectLink';
import { FormField } from '@/components/ui/form';

import { useThemeData } from '@/utils/hooks/useThemeData';
import { ForgotPasswordSchema } from '@/utils/schema';
import { commonIcon } from '@/utils/theme-image';
import { ButtonWithLoader } from '@/components/Button';
import { resetPassword } from '@/app/actions/authentication';

export default function ForgotPassword() {
  const [currentTheme] = useThemeData();
  const {
    execute,
    status,
    result: { data },
  } = useAction(resetPassword);

  const {
    formState: { errors },
    control,
    setError,
    handleSubmit,
  } = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(formValues: z.infer<typeof ForgotPasswordSchema>) {
    execute(formValues);
    if (data?.error) {
      setError('email', {
        message: data.error,
      });
    } else if (data?.response) {
      console.log(data.response);
    }
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex items-center justify-center flex-col dark:bg-app_dark_bg bg-[#FFFFFF] p-3 rounded-[16px] shadow-md">
        <div className="flex flex-col items-center p-6">
          <Image
            src={currentTheme?.authIcon}
            alt="auth icon"
            className="h-[70px] w-full md:h-[50px] md:w-[300px]"
            placeholder="empty"
          />
          <Image
            src={commonIcon.forgotPasswordImg}
            alt="!"
            className="h-24 w-full md:h-[50px] md:w-[300px]"
            placeholder="empty"
          />
          <h2 className="text-[28px] font-bold text-[#000000] dark:text-[#FFFFFF] md:text-[20px] pt-1">
            Forgot Password
          </h2>
          <p className="text-[#777777] dark:text-[#C3C3C3] text-center text-[14px] font-semibold pt-2 pb-4 md:text-[14px] max-w-sm">
            Enter your email we’ll send you a link to reset your password
          </p>
          <form className="w-full">
            <div className="w-full mt-5">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <InputWithLabel
                    {...field}
                    label="Email"
                    type="email"
                    placeholder="Email"
                    id="email-forget"
                    error={!!errors?.email}
                    errorMessage={errors?.email?.message}
                  />
                )}
              />
            </div>
            <ButtonWithLoader
              className="w-full mt-2 font-semibold text-[0.875rem]"
              type="button"
              label="SEND VERIFICATION LINK"
              // disabled={isValid}
              onClick={handleSubmit(onSubmit)}
              // isLoading
            />
          </form>
          <div className="w-full flex justify-between items-center mt-5">
            <p className="text-[#787878] dark:text-[#C3C3C3] font-bold text-[12px]">
              Already have an account ?
            </p>
            <RedirectLink href="/login" LinkText="SIGN IN" />
          </div>
        </div>
      </div>
    </div>
  );
}
