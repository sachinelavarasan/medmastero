import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '../ui/label';

interface CheckBoxInputProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
}

export function CheckboxInput({ label, ...props }: CheckBoxInputProps) {
  return (
    <div className="flex items-center">
      <Checkbox {...props} id={label} />
      <Label
        htmlFor={label}
        className="text-[14px] font-semibold leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#777777] dark:text-app_input_border ml-2.5">
        {label}
      </Label>
    </div>
  );
}
