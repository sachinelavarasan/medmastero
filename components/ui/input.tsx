'use client';

import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { cn } from '@/utils';
import { Button } from './button';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="relative">
        <input
          type={showPassword ? 'text' : type}
          className={cn(
            'flex h-[44px] w-full rounded-md border border-input border-[#ADADAD] bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#787878] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {type == 'password' && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? (
              <EyeIcon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
          </Button>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
