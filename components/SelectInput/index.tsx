import React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label";
import { SelectProps } from "@radix-ui/react-select";

interface SelectInputProps extends SelectProps {
  options: {value: string; label: string, id:string }[];
  placeHolder: string;
  label?: string;
  id?: string;
  selectTriggerClassName?: string;
}
const SelectInput = ({options, placeHolder, label ,selectTriggerClassName,...props}: SelectInputProps) => {
  console.log(options)
  return (
    <div className="grid w-full items-center gap-1.5">
      {label?.length ? <Label htmlFor={label} className="text-[#0E0E0E] dark:text-[#F2F2F2]">{label}</Label> :null}
      <Select {...props}>
        <SelectTrigger className={selectTriggerClassName}>
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent className="SelectInputContent border-[#ADADAD] bg-[#FFFFFF] dark:bg-[#0C1615]">
          {options.map((item: {value: string; label: string; id: string}) => (
            <SelectItem key={item.id} value={item.value.toString()} className="cursor-pointer">
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectInput;
