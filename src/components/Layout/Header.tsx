'use client';
import React from 'react';
import Link from 'next/link';

import { cn } from '@/utils/cn';
import { Container, Grid } from '@radix-ui/themes';

import { buttonVariants } from '../Button';
import { Image } from '../Image';

const Header: React.FC = () => {
  return (
    <Container size="4">
      <Grid columns="1">
        <div className="relative">
          <div className="flex justify-center items-center py-[20px]">
            <div>
              <Image
                src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
                width={184}
                height={80}
                alt="logo"
              />
            </div>
          </div>
          <div className="absolute right-0 top-0">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'absolute right-4 top-4 md:right-8 md:top-8'
              )}
            >
              Login
            </Link>
          </div>
        </div>
      </Grid>
    </Container>
  );
};

export default Header;
