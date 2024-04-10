'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useId } from 'react';

import { InputWithLabel } from '@/components/InputWithLabel';
import { FormField } from '@/components/ui/form';
import { ProfileSchema } from '@/utils/schema';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SelectInput } from '@/components/SelectInput';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { ButtonWithLoader } from '@/components/Button';
import { InputFile } from '@/components/InputFile';
import { Modal } from '@/components/Modal';
import FileUpload from './file-upload';

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
      phone: '',
      address: '',
      username: '',
      state: '',
      pincode: '',
      district: '',
      gender: '',
    },
  });

  function onSubmit(data: z.infer<typeof ProfileSchema>) {
    alert(JSON.stringify(data, null, 2));
  }
  return (
    <div className="w-full">
      <header className="flex justify-between items-center border-[#E5E4E4] dark:border-[#132826] border-b-[1.5px] py-4">
        <div>
          <div className="flex flex-row items-center">
            <h1 className="text-[24px] font-bold dark:text-[#FFF]">Personal Profile</h1>
            <div className="ml-2 bg-[#008778] px-2 rounded-full flex justify-center items-center">
              <span className="text-[0.75rem] font-bold text-[#FFF]">Seller</span>
            </div>
          </div>
          <span className="text-[#777777] text-[16px] font-semibold">
            Update your personal details and your photo here
          </span>
        </div>
        <div className="flex gap-4">
          <Button variant="cancel" type="button">
            Cancel
          </Button>
          <ButtonWithLoader label="Save Changes" onClick={handleSubmit(onSubmit)} />
        </div>
      </header>
      <div className="flex">
        <div className="w-3/5 mt-4">
          <form className="w-full">
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
            <div className="relative flex flex-col w-full md:flex-col mb-6">
              <Label className="mb-4" variant={errors?.gender?.message ? 'destructive' : 'default'}>
                What gender do you identify as ?
              </Label>
              <FormField
                control={control}
                name="gender"
                render={({ field }) => (
                  <RadioGroup {...field} onValueChange={field.onChange} defaultValue={field.value}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="transgender" id="transgender" />
                      <Label htmlFor="transgender">Trans-gender</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              <span
                className={`absolute opacity-0 bottom-0 text-[0.75rem] -mb-5 text-[#EA393E] overflow-hidden text-ellipsis whitespace-nowrap max-w-full ${errors?.gender?.message ? 'opacity-100 transition-opacity duration-200 ease-in-out' : ''} `}>
                {errors?.gender?.message}
              </span>
            </div>
            <div className="flex w-full md:flex-col gap-8 justify-between">
              <div className="w-2/6 md:w-full">
                <FormField
                  control={control}
                  name="district"
                  render={({ field }) => (
                    <SelectInput
                      {...field}
                      placeHolder="Select District"
                      options={[
                        { label: 'Karur', value: '1' },
                        { label: 'Coimbatore', value: '2' },
                      ]}
                      label="District"
                      id="district"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      error={!!errors?.district}
                      errorMessage={errors?.district?.message}
                    />
                  )}
                />
              </div>
              <div className="w-2/6 md:w-full">
                <FormField
                  control={control}
                  name="state"
                  render={({ field }) => (
                    <SelectInput
                      {...field}
                      placeHolder="Select State"
                      options={[
                        { label: 'Tamil nadu', value: '1' },
                        { label: 'Karnataka', value: '2' },
                      ]}
                      label="State"
                      id="state"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      error={!!errors?.state}
                      errorMessage={errors?.state?.message}
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

            <div className="relative w-1/2">
              <Label
                className="mb-4"
                variant={errors?.address?.message ? 'destructive' : 'default'}>
                Address
              </Label>
              <Textarea
                placeholder="Type your address here"
                id="message"
                errorMessage={errors?.address?.message}
              />
              <span
                className={`absolute opacity-0 bottom-0 text-[0.75rem] -mb-5 text-[#EA393E] overflow-hidden text-ellipsis whitespace-nowrap max-w-full ${errors?.address?.message ? 'opacity-100 transition-opacity duration-200 ease-in-out' : ''} `}>
                {errors?.address?.message}
              </span>
            </div>
          </form>
        </div>
        <div className="flex w-2/5 flex-col items-end mt-4">
          <h1 className="text-[20px] dark:text-[#FFFFFF] font-bold mb-2">Profile Picture</h1>
          <Avatar className="h-[400px] w-[400px] rounded-[10px]">
            <AvatarImage src="https://github.com/shadcn.png" className="h-full w-full" />
            <AvatarFallback className="h-full w-full">CN</AvatarFallback>
          </Avatar>
          <FileUpload className="mt-4" />
        </div>
      </div>
    </div>
  );
}

export default PersonalForm;
