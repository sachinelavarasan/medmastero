'use client';

import React from 'react';

import { Button, ButtonProps } from '../ui/button';
import { LucideLoader } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';

interface ButtonWithLoaderProps extends ButtonProps {
  label: string;
  className?: string;
  isLoading?: boolean;
  icon?: string | StaticImageData;
  disabled?: boolean;
}

const ButtonWithLoader = React.forwardRef<HTMLButtonElement, ButtonWithLoaderProps>(
  ({ className, label, isLoading, icon, disabled, ...props }, ref) => {
    return (
      <Button {...props} className={className} ref={ref} disabled={disabled || isLoading}>
        {isLoading ? <LucideLoader className="animate-spin h-5 w-5 mr-1.5" /> : null}{' '}
        <div className="flex items-center">
          {icon && <Image src={icon} alt="" className="h-5 w-5 mr-2" />}
          {label}
        </div>
      </Button>
    );
  },
);

ButtonWithLoader.displayName = 'ButtonWithLoader';

export { ButtonWithLoader };
