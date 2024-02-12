"use client"

import {CheckboxInput} from "@/components/CheckBoxInput"
import {InputWithLabel} from "@/components/InputWithLabel"
import RedirectLink from "@/components/RedirectLink"
import SelectInput from "@/components/SelectInput"
import {Button} from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {useThemeData} from "@/utils/hooks/useThemeData"
import Image from "next/image"
import {useId} from "react"

export default function SignUp() {
  const [currentTheme] = useThemeData()
  return (
    <div className="h-full flex items-center justify-center">
      <div className="h-full flex items-center justify-center flex-col">
        <Image
          src={currentTheme?.authIcon}
          alt="auth icon"
          className="h-[70px] w-full md:h-[50px] md:w-[300px]"
          placeholder="empty"
        />
        <span className="text-[28px] font-bold text-[#000000] dark:text-[#FFFFFF] md:text-[24px] pt-1">
          Create Account
        </span>
        <p className="text-[#777777] dark:text-[#C3C3C3] text-[16px] font-semibold pt-2 pb-10 max-w-sm text-center">
          Let’s get Started. Are you ready to be part of something new ?
        </p>
        <div className="flex items-center w-full md:flex-col mt-4 gap-3">
          <div className="w-2/5 md:w-full">
            <InputWithLabel
              label="Name"
              type="text"
              placeholder="Enter your name"
              id="name"
            />
          </div>
          <div className="w-3/5 md:w-full">
            <InputWithLabel
              label="Email"
              type="email"
              placeholder="Enter your email"
              id="email"
            />
          </div>
        </div>
        <div className="mt-4 w-full">
          <InputWithLabel
            label="Phone Number"
            type="number"
            placeholder="Enter your phone number"
            id="phoneNumber"
          />
        </div>

        <div className="flex w-full md:flex-col mt-4 gap-3 justify-between">
          <div className="w-3/6 md:w-full">
            <InputWithLabel
              label="OTP Number"
              type="number"
              placeholder="Enter your OTP number"
              id="otpNumber"
            />
          </div>
          <div className="w-3/6 md:w-full mt-8">
            <button type="button" className="text-[#00BBA8] text-[12px] font-semibold w-full text-right">Click here Send OTP Verification</button>
          </div>
        </div>

        <div className="mt-7 w-full mb-2">
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
        </div>
        <div className="mt-4 w-full">
          <InputWithLabel
            label="Password"
            type="password"
            placeholder="password"
            id="password"
          />
        </div> */}

        <Button className="w-full mt-8">Sign Up</Button>
        <div className="w-full flex justify-between items-center mt-5">
          <p className="text-[#787878] dark:text-[#C3C3C3] font-bold text-[12px]">
             Already have an account ? 
          </p>
          <RedirectLink href="/login" LinkText="Sign In" />
        </div>
      </div>
    </div>
  )
}
