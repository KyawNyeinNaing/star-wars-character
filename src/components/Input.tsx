'use client';
import * as React from 'react';

import { cn } from '@/utils/cn';
import { TextField } from '@radix-ui/themes';
import { Icons } from './Image';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

interface Props extends InputProps {
  inputClasses?: string;
  rootClasses?: string;
  onChange?: (arg?: any) => void;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ onChange, inputClasses, rootClasses, type }, ref) => {
    return (
      <TextField.Root className={rootClasses}>
        <TextField.Input
          className={cn('outline-none', inputClasses)}
          placeholder="Search with name..."
          size="3"
          onChange={onChange}
          type={type}
          ref={ref}
        />
        <TextField.Slot>
          <Icons.search className="w-[20px] h-[20px]" />
        </TextField.Slot>
      </TextField.Root>
    );
  }
);
Input.displayName = 'Input';

export { Input };
