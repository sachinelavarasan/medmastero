'use client';

import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

interface InputWithLabelProps extends InputProps {
  label?: string;
  type: string;
  placeholder?: string;
  id?: string;
  containerClass?: string;
  error?: boolean;
  errorMessage?: string;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  (
    { className, label, type, placeholder, id, containerClass, error, errorMessage, ...props },
    ref,
  ) => {
    return (
      <div className={`relative grid w-full items-center gap-1.5 pb-5 ${containerClass}`}>
        <Label
          htmlFor={label}
          variant={error ? 'destructive' : !props.disabled ? 'default' : 'disabled'}>
          {label}
        </Label>
        <Input
          type={type}
          id={id}
          placeholder={placeholder}
          ref={ref}
          {...props}
          className={`${error ? 'border-destructive' : ''}`}
        />
        <span
          className={`absolute opacity-0 bottom-0 text-[0.75rem] text-destructive overflow-hidden text-ellipsis whitespace-nowrap max-w-full ${error ? 'opacity-100 transition-opacity duration-200 ease-in-out' : ''} `}>
          {errorMessage}
        </span>
      </div>
    );
  },
);

InputWithLabel.displayName = 'InputWithLabel';

export { InputWithLabel };
