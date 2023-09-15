'use client';
import * as React from 'react';
import { Text as RText } from '@radix-ui/themes';

interface Props {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'p';
  size?: string;
}

export const Text = React.forwardRef<HTMLDivElement, Props>(
  ({ children, as, className, ...rest }: Props, ref) => (
    <RText ref={ref} as={as} className={className} {...(rest as any)}>
      {children}
    </RText>
  )
);

Text.displayName = 'Text';
