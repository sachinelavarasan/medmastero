import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputWithLabelProps extends InputProps {
  label?: string;
  type: string;
  placeholder?: string;
  id?: string;
  containerClass?: string;
}

export function InputWithLabel({
  label,
  type,
  placeholder,
  id,
  containerClass,
  ...props
}: InputWithLabelProps) {
  return (
    <div className={`grid w-full items-center gap-1.5 ${containerClass}`}>
      <Label htmlFor={label} className="mb-1">
        {label}
      </Label>
      <Input type={type} id={id} placeholder={placeholder} {...props} />
    </div>
  );
}
