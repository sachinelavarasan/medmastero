import * as React from 'react';

import { cn } from '@/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, errorMessage, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-app_input_border bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-[#787878] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
          `${errorMessage ? 'border-[#EA393E]' : ''}`,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
