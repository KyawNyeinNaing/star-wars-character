'use client';
import * as React from 'react';

import { cn } from '@/utils/cn';
import { TextField } from '@radix-ui/themes';
import { Icons } from './Image';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

interface Props extends InputProps {
  inputClasses?: string;
  rootClasses?: string;
  search?: string | null;
  onChange?: (arg?: any) => void;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ onChange, search, inputClasses, rootClasses, type }, ref) => {
    return (
      <TextField.Root className={rootClasses}>
        <TextField.Input
          className={cn('outline-none', inputClasses)}
          onChange={onChange}
          defaultValue={search as string}
          placeholder="Search with name..."
          size="3"
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
