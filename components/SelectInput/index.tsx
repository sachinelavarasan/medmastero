import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '../ui/label';
import { SelectProps } from '@radix-ui/react-select';

interface SelectInputProps extends SelectProps {
  options: { value: string; label: string; id?: string }[];
  placeHolder: string;
  label?: string;
  id?: string;
  selectTriggerClassName?: string;
  error?: boolean;
  errorMessage?: string;
}
export interface HTMLSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const SelectInput = React.forwardRef<HTMLSelectProps, SelectInputProps>(
  ({ options, placeHolder, label, selectTriggerClassName, error, errorMessage, ...props }, ref) => {
    return (
      <div className="relative grid w-full items-center gap-1.5">
        {label?.length ? (
          <Label
            htmlFor={label}
            variant={error ? 'destructive' : !props.disabled ? 'default' : 'disabled'}>
            {label}
          </Label>
        ) : null}
        <Select {...props}>
          <SelectTrigger
            className={`${selectTriggerClassName} text-[#787878] ${error ? 'border-[#EA393E]' : ''}`}>
            <SelectValue placeholder={placeHolder} />
          </SelectTrigger>
          <SelectContent className="SelectInputContent border-[#ADADAD] bg-[#FFFFFF] dark:bg-[#0C1615]">
            {options.map((item: { value: string; label: string; id?: string }) => (
              <SelectItem key={item.value} value={item.value.toString()} className="cursor-pointer">
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span
          className={`absolute opacity-0 bottom-0 text-[0.75rem] -mb-4 text-[#EA393E] overflow-hidden text-ellipsis whitespace-nowrap max-w-full ${error ? 'opacity-100 transition-opacity duration-200 ease-in-out' : ''} `}>
          {errorMessage}
        </span>
      </div>
    );
  },
);

SelectInput.displayName = 'SelectInput';

export { SelectInput };
