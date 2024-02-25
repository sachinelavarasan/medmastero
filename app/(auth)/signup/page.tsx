'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
// import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CheckboxInput } from '@/components/CheckBoxInput';
import { InputWithLabel } from '@/components/InputWithLabel';
import RedirectLink from '@/components/RedirectLink';
// import SelectInput from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
import { FormField } from '@/components/ui/form';

import { useThemeData } from '@/utils/hooks/useThemeData';
import { SignUpSchema } from '@/utils/schema';

export default function SignUp() {
  const [currentTheme] = useThemeData();

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      phone: '',
      otp: '',
    },
  });

  function onSubmit(data: z.infer<typeof SignUpSchema>) {
    alert(JSON.stringify(data, null, 2));
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
            priority
          />
          <span className="text-[28px] font-bold text-[#000000] dark:text-[#FFFFFF] md:text-[24px] pt-1">
            Create Account
          </span>
          <p className="text-[#777777] dark:text-[#C3C3C3] text-[14px] font-semibold pt-2 pb-2 max-w-sm text-center">
            Let’s get Started. Are you ready to be part of something new ?
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex items-center w-full md:flex-col mt-4 gap-3">
              <div className="w-2/5 md:w-full">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <InputWithLabel
                      {...field}
                      label="Name"
                      type="text"
                      placeholder="Enter your name"
                      error={!!errors?.name}
                      errorMessage={errors?.name?.message}
                    />
                  )}
                />
              </div>
              <div className="w-3/5 md:w-full">
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <InputWithLabel
                      {...field}
                      label="Email"
                      type="email"
                      placeholder="Enter your email"
                      containerClass="mb-1"
                      error={!!errors?.email}
                      errorMessage={errors?.email?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full">
              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <InputWithLabel
                    {...field}
                    label="Phone Number"
                    type="text"
                    placeholder="Eg: +91XXXXXXXXXX"
                    containerClass="mb-1"
                    error={!!errors?.phone}
                    errorMessage={errors?.phone?.message}
                  />
                )}
              />
            </div>

            <div className="flex w-full md:flex-col gap-3 justify-between">
              <div className="w-3/6 md:w-full">
                <FormField
                  control={control}
                  name="otp"
                  render={({ field }) => (
                    <InputWithLabel
                      {...field}
                      label="OTP"
                      type="text"
                      placeholder="Enter your OTP"
                      containerClass="mb-1"
                      error={!!errors?.otp}
                      errorMessage={errors?.otp?.message}
                    />
                  )}
                />
              </div>
              <div className="w-3/6 md:w-full mt-5">
                <button
                  type="button"
                  className="text-app_green text-[12px] font-semibold w-full text-right">
                  Click here Send OTP Verification
                </button>
              </div>
            </div>

            <div className="w-full">
              <CheckboxInput label="Are you seller ? Then check here !" />
            </div>

            {/* <div className="flex items-center w-full md:flex-col mt-4 gap-2">
          <div className="w-2/6 md:w-full">
            <SelectInput
              placeHolder="select country"
              options={[
                {label: "India", value: "1", id: useId()},
                {label: "USA", value: "2", id: useId()},
              ]}
              label="Country"
              id="country"
            />
          </div>
          <div className="w-2/6 md:w-full">
            <SelectInput
              placeHolder="select state"
              options={[
                {label: "Tamil nadu", value: "1", id: useId()},
                {label: "Karnataka", value: "2", id: useId()},
              ]}
              label="State"
              id="state"
            />
          </div>
          <div className="w-2/6 md:w-full">
            <SelectInput
              placeHolder="select district"
              options={[
                {label: "Karur", value: "1", id: useId()},
                {label: "Coimbatore", value: "2", id: useId()},
              ]}
              label="District"
              id="district"
            />
          </div>
        </div>
        <div className="mt-4 grid w-full items-center gap-2">
          <Label>Shop Address</Label>
          <Textarea placeholder="Type your address here" id="message" />
        </div> */}
            <div className="mt-4 w-full">
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
            </div>

            <Button className="w-full mt-2" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="w-full flex justify-between items-center mt-5">
            <p className="text-[#787878] dark:text-[#C3C3C3] font-bold text-[12px]">
              Already have an account ?
            </p>
            <RedirectLink href="/login" LinkText="Sign In" />
          </div>
        </div>
      </div>
    </div>
  );
}
