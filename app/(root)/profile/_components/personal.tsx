'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputWithLabel } from '@/components/InputWithLabel';
import { FormField } from '@/components/ui/form';
import { Gender, ProfileSchema } from '@/utils/schema';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SelectInput } from '@/components/SelectInput';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { ButtonWithLoader } from '@/components/Button';

import FileUpload from './file-upload';
import { useUserStore } from '@/lib/stores/user-store';
import { useEffect } from 'react';

function PersonalForm() {
  const { currentUser } = useUserStore((state) => state);
  const {
    formState: { errors, isDirty },
    control,
    handleSubmit,
    reset,
  } = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      us_email: '',
      us_fullname: '',
      us_phone_number: '',
      us_address: '',
      us_username: '',
      us_state: '',
      us_pincode: '',
      us_district: '',
      us_gender: '',
    },
  });

  useEffect(() => {
    if (currentUser) {
      reset({
        us_email: currentUser?.us_email,
        us_fullname: currentUser?.us_fullname,
        us_phone_number: currentUser?.us_phone_number,
        us_gender: currentUser?.us_gender == 1 ? Gender.Male : Gender.Female,
        us_state: currentUser?.us_state,
        us_district: currentUser?.us_district,
        us_pincode: currentUser?.us_pincode,
        us_address: currentUser?.us_address,
        us_username: currentUser?.us_username,
      });
    }
  }, [currentUser]);

  function onSubmit(data: z.infer<typeof ProfileSchema>) {
    alert(JSON.stringify(data, null, 2));
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <ButtonWithLoader label="Save Changes" type="submit" disabled={!isDirty} />
          </div>
        </header>
        <div className="flex">
          <div className="w-3/5 mt-4">
            <div className="w-full">
              <div className="flex items-center w-full md:flex-col gap-8">
                <div className="w-2/4 md:w-full">
                  <FormField
                    control={control}
                    name="us_fullname"
                    render={({ field }) => (
                      <InputWithLabel
                        {...field}
                        label="Name"
                        type="text"
                        placeholder="Your name"
                        error={!!errors?.us_fullname}
                        errorMessage={errors?.us_fullname?.message}
                      />
                    )}
                  />
                </div>
                <div className="w-2/4 md:w-full">
                  <FormField
                    control={control}
                    name="us_username"
                    render={({ field }) => (
                      <InputWithLabel
                        {...field}
                        label="Username"
                        type="text"
                        placeholder="Your username"
                        error={!!errors?.us_username}
                        errorMessage={errors?.us_username?.message}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex items-center w-full md:flex-col gap-8">
                <div className="w-2/4 md:w-full">
                  <FormField
                    control={control}
                    name="us_email"
                    render={({ field }) => (
                      <InputWithLabel
                        {...field}
                        label="Email"
                        type="email"
                        placeholder="Your email"
                        error={!!errors?.us_email}
                        errorMessage={errors?.us_email?.message}
                      />
                    )}
                  />
                </div>
                <div className="w-2/4 md:w-full">
                  <FormField
                    control={control}
                    name="us_phone_number"
                    render={({ field }) => (
                      <InputWithLabel
                        {...field}
                        label="Phone Number"
                        type="text"
                        placeholder="Eg: +91XXXXXXXXXX"
                        error={!!errors?.us_phone_number}
                        errorMessage={errors?.us_phone_number?.message}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="relative flex flex-col w-full md:flex-col mb-6">
                <Label
                  className="mb-4"
                  variant={errors?.us_gender?.message ? 'destructive' : 'default'}>
                  What gender do you identify as ?
                </Label>
                <FormField
                  control={control}
                  name="us_gender"
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
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
                  className={`absolute opacity-0 bottom-0 text-[0.75rem] -mb-5 text-[#EA393E] overflow-hidden text-ellipsis whitespace-nowrap max-w-full ${errors?.us_gender?.message ? 'opacity-100 transition-opacity duration-200 ease-in-out' : ''} `}>
                  {errors?.us_gender?.message}
                </span>
              </div>
              <div className="flex w-full md:flex-col gap-8 justify-between">
                <div className="w-2/6 md:w-full">
                  <FormField
                    control={control}
                    name="us_district"
                    render={({ field }) => (
                      <SelectInput
                        {...field}
                        placeHolder="Select District"
                        options={[
                          { label: 'Karur', value: 'Karur' },
                          { label: 'Coimbatore', value: 'Coimbatore' },
                        ]}
                        label="District"
                        id="district"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        error={!!errors?.us_district}
                        errorMessage={errors?.us_district?.message}
                      />
                    )}
                  />
                </div>
                <div className="w-2/6 md:w-full">
                  <FormField
                    control={control}
                    name="us_state"
                    render={({ field }) => (
                      <SelectInput
                        {...field}
                        placeHolder="Select State"
                        options={[
                          { label: 'Tamil nadu', value: 'Tamil nadu' },
                          { label: 'Karnataka', value: 'Karnataka' },
                        ]}
                        label="State"
                        id="state"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        error={!!errors?.us_state}
                        errorMessage={errors?.us_state?.message}
                      />
                    )}
                  />
                </div>
                <div className="w-2/6 md:w-full">
                  <FormField
                    control={control}
                    name="us_pincode"
                    render={({ field }) => (
                      <InputWithLabel
                        {...field}
                        label="Pincode"
                        type="text"
                        placeholder="Eg: 639001"
                        error={!!errors?.us_pincode}
                        errorMessage={errors?.us_pincode?.message}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="relative w-1/2">
                <Label
                  className="mb-4"
                  variant={errors?.us_address?.message ? 'destructive' : 'default'}>
                  Address
                </Label>

                <FormField
                  control={control}
                  name="us_address"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Type your address here"
                      id="message"
                      errorMessage={errors?.us_address?.message}
                    />
                  )}
                />

                <span
                  className={`absolute opacity-0 bottom-0 text-[0.75rem] -mb-5 text-[#EA393E] overflow-hidden text-ellipsis whitespace-nowrap max-w-full ${errors?.us_address?.message ? 'opacity-100 transition-opacity duration-200 ease-in-out' : ''} `}>
                  {errors?.us_address?.message}
                </span>
              </div>
            </div>
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
    </form>
  );
}

export default PersonalForm;
