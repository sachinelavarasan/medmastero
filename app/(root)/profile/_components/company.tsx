'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';

import { InputWithLabel } from '@/components/InputWithLabel';
import { FormField } from '@/components/ui/form';
import { ShopProfileSchema } from '@/utils/schema';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SelectInput } from '@/components/SelectInput';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { ButtonWithLoader } from '@/components/Button';
import { Modal } from '@/components/Modal';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

import TrashIcon from '@/public/icons/trash.svg';
import { useThemeData } from '@/utils/hooks/useThemeData';

function CompanyForm() {
  const [currentTheme] = useThemeData();
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<z.infer<typeof ShopProfileSchema>>({
    resolver: zodResolver(ShopProfileSchema),
    defaultValues: {
      shopName: '',
      branchCount: 0,
      gstNumber: '',
      branches: [],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'branches', // unique name for your Field Array
  });

  function onSubmit(data: z.infer<typeof ShopProfileSchema>) {
    alert(JSON.stringify(data, null, 2));
  }

  const addBranch = () => {
    append({
      branchName: '',
      branchMailId: '',
      branchPhoneNo: '',
      branchDistrict: '',
      branchPincode: '',
      branchState: '',
      branchAddress: '',
      branchLocation: '',
      branchWebsite: '',
    });
  };

  const branchImages = [
    { imageUrl: currentTheme.uploadBtnIcon },
    { imageUrl: TrashIcon },
    { imageUrl: currentTheme.uploadBtnIcon },
    { imageUrl: TrashIcon },
  ];

  return (
    <>
      <div className="w-full pb-10">
        <header className="flex justify-between items-center border-[#E5E4E4] dark:border-[#132826] border-b-[1.5px] py-4">
          <div>
            <div className="flex flex-row items-center">
              <h1 className="text-[24px] font-bold dark:text-[#FFF]">Shop Profile</h1>
              <div className="ml-2 bg-[#008778] px-2 rounded-full flex justify-center items-center">
                <span className="text-[0.75rem] font-bold text-[#FFF]">Seller</span>
              </div>
            </div>
            <span className="text-[#777777] text-[16px] font-semibold">
              Update your shop details and upload photos here
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
          {/* <div className="w-3/5 mt-4"> */}
          <form className="w-full">
            <div className="flex flex-col mb-8">
              <div>
                <span className="text-[0.875rem] font-bold">Shop Logo</span>
              </div>
              <div className="flex items-center mt-4">
                <div>
                  <Avatar className="h-[60px] w-[60px] rounded-[10px]">
                    <AvatarImage src="https://github.com/shadcn.png" className="h-full w-full" />
                    <AvatarFallback className="h-full w-full">CN</AvatarFallback>
                  </Avatar>
                </div>
                <ButtonWithLoader
                  label="Upload Image"
                  onClick={handleSubmit(onSubmit)}
                  icon={currentTheme.uploadBtnIcon}
                  className="ml-6"
                />
                <ButtonWithLoader
                  variant="outline_danger"
                  type="button"
                  className="ml-3"
                  label="Remove"
                  icon={TrashIcon}
                />
              </div>
            </div>

            <div className="flex items-center w-3/5 md:flex-col gap-8 mb-4">
              <div className="w-2/5 md:w-full">
                <FormField
                  control={control}
                  name="shopName"
                  render={({ field }) => (
                    <InputWithLabel
                      {...field}
                      label="Shop Name"
                      type="text"
                      placeholder="Your shop name"
                      error={!!errors?.shopName}
                      errorMessage={errors?.shopName?.message}
                    />
                  )}
                />
              </div>
              <div className="w-2/5 md:w-full">
                <FormField
                  control={control}
                  name="gstNumber"
                  render={({ field }) => (
                    <InputWithLabel
                      {...field}
                      label="GST Number"
                      type="text"
                      placeholder="Your GST Number"
                      error={!!errors?.gstNumber}
                      errorMessage={errors?.gstNumber?.message}
                    />
                  )}
                />
              </div>
              <div className="w-1/5 md:w-full">
                <FormField
                  control={control}
                  name="branchCount"
                  render={({ field }) => (
                    <InputWithLabel
                      {...field}
                      label="Branch Count"
                      type="number"
                      placeholder="Your branch count"
                      error={!!errors?.branchCount}
                      errorMessage={errors?.branchCount?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div className="w-full">
              {fields.map((branch, index) => (
                <div className="w-full flex flex-row justify-between" key={branch.id}>
                  <div className="flex flex-col mb-8 w-3/5">
                    <div className="title font-bold">Branch {index + 1}</div>
                    <div className="flex items-center w-full md:flex-col gap-8 mt-4">
                      <div className="w-2/4 md:w-full">
                        <FormField
                          control={control}
                          name={`branches.${index}.branchMailId`}
                          render={({ field }) => (
                            <InputWithLabel
                              {...field}
                              label="Email"
                              type="email"
                              placeholder="Your branch email"
                              error={!!errors?.branches?.[index]?.branchMailId}
                              errorMessage={errors?.branches?.[index]?.branchMailId?.message}
                            />
                          )}
                        />
                      </div>
                      <div className="w-2/4 md:w-full">
                        <FormField
                          control={control}
                          name={`branches.${index}.branchPhoneNo`}
                          render={({ field }) => (
                            <InputWithLabel
                              {...field}
                              label="Phone Number"
                              type="text"
                              placeholder="Eg: +91XXXXXXXXXX"
                              error={!!errors?.branches?.[index]?.branchPhoneNo}
                              errorMessage={errors?.branches?.[index]?.branchPhoneNo?.message}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex items-center w-full md:flex-col gap-8">
                      <div className="w-2/4 md:w-full">
                        <FormField
                          control={control}
                          name={`branches.${index}.branchWebsite`}
                          render={({ field }) => (
                            <InputWithLabel
                              {...field}
                              label="Website"
                              type="text"
                              placeholder="Your website link"
                              error={!!errors?.branches?.[index]?.branchWebsite}
                              errorMessage={errors?.branches?.[index]?.branchWebsite?.message}
                            />
                          )}
                        />
                      </div>
                      <div className="w-2/4 md:w-full">
                        <FormField
                          control={control}
                          name={`branches.${index}.branchLocation`}
                          render={({ field }) => (
                            <InputWithLabel
                              {...field}
                              label="Location"
                              type="text"
                              placeholder="Your branch location"
                              error={!!errors?.branches?.[index]?.branchLocation}
                              errorMessage={errors?.branches?.[index]?.branchLocation?.message}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex w-full md:flex-col gap-8 justify-between">
                      <div className="w-2/6 md:w-full">
                        <FormField
                          control={control}
                          name={`branches.${index}.branchDistrict`}
                          render={({ field }) => (
                            <SelectInput
                              {...field}
                              placeHolder="Select District"
                              options={[
                                { label: 'Karur', value: '1' },
                                { label: 'Coimbatore', value: '2' },
                              ]}
                              label="District"
                              id="branchDistrict"
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              error={!!errors?.branches?.[index]?.branchDistrict}
                              errorMessage={errors?.branches?.[index]?.branchDistrict?.message}
                            />
                          )}
                        />
                      </div>
                      <div className="w-2/6 md:w-full">
                        <FormField
                          control={control}
                          name={`branches.${index}.branchState`}
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
                              error={!!errors?.branches?.[index]?.branchState}
                              errorMessage={errors?.branches?.[index]?.branchState?.message}
                            />
                          )}
                        />
                      </div>
                      <div className="w-2/6 md:w-full">
                        <FormField
                          control={control}
                          name={`branches.${index}.branchPincode`}
                          render={({ field }) => (
                            <InputWithLabel
                              {...field}
                              label="Pincode"
                              type="text"
                              placeholder="Eg: 639001"
                              error={!!errors?.branches?.[index]?.branchPincode}
                              errorMessage={errors?.branches?.[index]?.branchPincode?.message}
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="relative w-1/2">
                      <Label
                        className="mb-4"
                        variant={
                          errors?.branches?.[index]?.branchAddress?.message
                            ? 'destructive'
                            : 'default'
                        }>
                        Address
                      </Label>
                      <Textarea
                        placeholder="Type your branch address here"
                        id="message"
                        errorMessage={errors.branches?.[index]?.branchAddress?.message}
                      />
                      <span
                        className={`absolute opacity-0 bottom-0 text-[0.75rem] -mb-5 text-[#EA393E] overflow-hidden text-ellipsis whitespace-nowrap max-w-full ${errors.branches?.[index]?.branchAddress?.message ? 'opacity-100 transition-opacity duration-200 ease-in-out' : ''} `}>
                        {errors.branches?.[index]?.branchAddress?.message}
                      </span>
                    </div>
                  </div>
                  <div className="w-2/5 flex flex-col">
                    <div className="font-bold text-right">Branch Pictures</div>
                    {branchImages.length > 0 ? (
                      <div className="w-full flex justify-end mt-6">
                        {branchImages.map((img, index) => (
                          <div>
                            {index < 5 ? (
                              <div className="h-14 w-14 rounded-sm bg-app_green border-[#E5E4E4] dark:bg-[#0C1615] dark:border-[#132826] border flex items-center justify-center ml-2 bg-opacity-10">
                                <Image
                                  src={img.imageUrl}
                                  alt="auth icon"
                                  className="p-2 w-full h-full relative"
                                  placeholder="empty"
                                  priority
                                />
                                {index == 2 ? (
                                  <Modal
                                    button={
                                      <button className="text-1 bg-app_green text-[#FFFFFF] hover:bg-app_green/90 text-[10px] font-bold absolute h-[20px] bg-opacity-85 rounded-[2px]">
                                        <span className="px-1 py-2">View all</span>
                                      </button>
                                    }
                                    title="Pictures">
                                    <div>
                                      <Carousel
                                        opts={{
                                          align: 'start',
                                        }}
                                        className="w-full max-w-sm">
                                        <CarouselContent>
                                          {branchImages.map((img, index) => (
                                            <CarouselItem
                                              key={index}
                                              className="md:basis-1/2 lg:basis-1/3">
                                              <div className="p-1">
                                                <Card>
                                                  <CardContent className="flex aspect-square items-center justify-center p-6">
                                                    <Image
                                                      src={img.imageUrl}
                                                      alt="auth icon"
                                                      className="p-2 w-full h-full relative"
                                                      placeholder="empty"
                                                      priority
                                                    />
                                                  </CardContent>
                                                </Card>
                                              </div>
                                            </CarouselItem>
                                          ))}
                                        </CarouselContent>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                      </Carousel>
                                    </div>
                                  </Modal>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : null}
                    <div className="button-container flex justify-end mt-6">
                      <ButtonWithLoader
                        label={branchImages.length > 0 ? 'Upload More' : 'Upload Here'}
                        // onClick={handleSubmit(onSubmit)}
                        icon={currentTheme.uploadBtnIcon}
                        className="ml-6"
                      />
                      {branchImages.length > 0 ? (
                        <ButtonWithLoader
                          variant="outline_danger"
                          type="button"
                          className="ml-3"
                          label="Delete all"
                          icon={TrashIcon}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
              <ButtonWithLoader
                label="Add Branch"
                onClick={() => addBranch()}
                className=""
                type="button"
              />
            </div>
          </form>
          {/* </div> */}
          {/* <div className="flex w-2/5 flex-col items-end mt-4">
          <h1 className="text-[20px] dark:text-[#FFFFFF] font-bold mb-2">Profile Picture</h1>
          <Avatar className="h-[400px] w-[400px] rounded-[10px]">
            <AvatarImage src="https://github.com/shadcn.png" className="h-full w-full" />
            <AvatarFallback className="h-full w-full">CN</AvatarFallback>
          </Avatar>
        </div> */}
        </div>
      </div>
    </>
  );
}

export default CompanyForm;
