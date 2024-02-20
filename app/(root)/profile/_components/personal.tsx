'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useId } from 'react';

import { InputWithLabel } from '@/components/InputWithLabel';
import { FormField } from '@/components/ui/form';
import { ProfileSchema } from '@/utils/schema';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import SelectInput from '@/components/SelectInput';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

function PersonalForm() {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      phone: '',
      otp: '',
      username: '',
    },
  });

  function onSubmit(data: z.infer<typeof ProfileSchema>) {
    alert(JSON.stringify(data, null, 2));
  }
  return (
    <div className="w-full">
      <div className="flex">
        <div className="w-3/5 mt-4">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex items-center w-full md:flex-col gap-8">
              <div className="w-2/4 md:w-full">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <InputWithLabel
                      {...field}
                      label="Name"
                      type="text"
                      placeholder="Your name"
                      error={!!errors?.name}
                      errorMessage={errors?.name?.message}
                    />
                  )}
                />
              </div>
              <div className="w-2/4 md:w-full">
                <FormField
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <InputWithLabel
                      {...field}
                      label="Username"
                      type="text"
                      placeholder="Your username"
                      error={!!errors?.username}
                      errorMessage={errors?.username?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex items-center w-full md:flex-col gap-8">
              <div className="w-2/4 md:w-full">
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <InputWithLabel
                      {...field}
                      label="Email"
                      type="email"
                      placeholder="Your email"
                      error={!!errors?.email}
                      errorMessage={errors?.email?.message}
                    />
                  )}
                />
              </div>
              <div className="w-2/4 md:w-full">
                <FormField
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <InputWithLabel
                      {...field}
                      label="Phone Number"
                      type="text"
                      placeholder="Eg: +91XXXXXXXXXX"
                      error={!!errors?.phone}
                      errorMessage={errors?.phone?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col w-full md:flex-col mb-6">
              <Label className="mb-4">What gender do you identify as ?</Label>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="trans-gender" id="trans-gender" />
                  <Label htmlFor="trans-gender">Trans-gender</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex w-full md:flex-col gap-8 justify-between">
              <div className="w-2/6 md:w-full">
                <FormField
                  control={control}
                  name="otp"
                  render={({ field }) => (
                    <SelectInput
                      {...field}
                      placeHolder="Select District"
                      options={[
                        { label: 'Karur', value: '1', id: useId() },
                        { label: 'Coimbatore', value: '2', id: useId() },
                      ]}
                      label="District"
                      id="district"
                    />
                  )}
                />
              </div>
              <div className="w-2/6 md:w-full">
                <FormField
                  control={control}
                  name="otp"
                  render={({ field }) => (
                    <SelectInput
                      {...field}
                      placeHolder="Select State"
                      options={[
                        { label: 'Tamil nadu', value: '1', id: useId() },
                        { label: 'Karnataka', value: '2', id: useId() },
                      ]}
                      label="State"
                      id="state"
                    />
                  )}
                />
              </div>
              <div className="w-2/6 md:w-full">
                <FormField
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <InputWithLabel
                      {...field}
                      label="Pincode"
                      type="text"
                      placeholder="Eg: 639001"
                      error={!!errors?.phone}
                      errorMessage={errors?.phone?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div className="w-1/2">
              <Label>Shop Address</Label>
              <Textarea placeholder="Type your address here" id="message" />
            </div>
          </form>
        </div>
        <div className="flex w-2/5 flex-col items-end mt-4">
          <h1 className="text-[20px] dark:text-[#FFFFFF] font-bold mb-2">Profile Picture</h1>
          <Avatar className="h-[400px] w-[400px] rounded-[10px]">
            <AvatarImage src="https://github.com/shadcn.png" className="h-full w-full" />
            <AvatarFallback className="h-full w-full">CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

export default PersonalForm;
