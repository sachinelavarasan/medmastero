import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputWithLabelProps extends InputProps {
  label: string;
  type: string;
  placeholder: string;
  id: string;
}

export function InputWithLabel({ label, type, placeholder, id, ...props }: InputWithLabelProps) {
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor={label}>{label}</Label>
      <Input type={type} id={id} placeholder={placeholder} {...props} />
    </div>
  );
}
