'use client';

import React from 'react';

import { Button, ButtonProps } from '../ui/button';
import { Loader } from 'lucide-react';

interface ButtonWithLoaderProps extends ButtonProps {
  label: string;
  className?: string;
  isLoading?: boolean;
}

const ButtonWithLoader = React.forwardRef<HTMLButtonElement, ButtonWithLoaderProps>(
  ({ className, label, isLoading, ...props }, ref) => {
    return (
      <Button type="submit" {...props} className={className} ref={ref} disabled={isLoading}> 
        {isLoading ? <Loader className="animate-spin h-4 w-4 mr-1.5" /> : null} <span>{label}</span>
      </Button>
    );
  },
);

ButtonWithLoader.displayName = 'ButtonWithLoader';

export { ButtonWithLoader };
