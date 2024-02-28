'use client';

import React from 'react';

import { Button, ButtonProps } from '../ui/button';
import { Loader } from 'lucide-react';
import Image from 'next/image';

interface ButtonWithLoaderProps extends ButtonProps {
  label: string;
  className?: string;
  isLoading?: boolean;
  icon?: string;
}

const ButtonWithLoader = React.forwardRef<HTMLButtonElement, ButtonWithLoaderProps>(
  ({ className, label, isLoading, icon , ...props }, ref) => {
    return (
      <Button {...props} className={className} ref={ref} disabled={isLoading}>
        {isLoading ? <Loader className="animate-spin h-4 w-4 mr-1.5" /> : null} <div className='flex items-center'>
        {icon && <Image src={icon} alt="" className='h-4 w-4 mr-2'/> } 
        {label}</div>
      </Button>
    );
  },
);

ButtonWithLoader.displayName = 'ButtonWithLoader';

export { ButtonWithLoader };
