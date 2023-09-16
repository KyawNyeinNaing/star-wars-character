'use client';
import { Container, Grid } from '@radix-ui/themes';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Image, Icons } from '../Image';
import { Input } from '../Input';
import { useAtom } from 'jotai';
import { searchAtom } from '@/shared/atom';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';

const Header: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (!search) {
      router.push('/');
    } else {
      router.push(`/?search=${search}`);
    }
  }, [search, router]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const debouncedOnChange = debounce(handleChange, 500);

  return (
    <Container size="4">
      <Grid columns="1">
        <div className="flex justify-between items-center py-[20px]">
          <div>
            <Image
              src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
              width={184}
              height={80}
              alt="logo"
            />
          </div>
          <div className="flex items-center justify-start border-none rounded-[5px] h-[40px] outline-none text-white text-[16px] relative">
            <Input onChange={event => debouncedOnChange(event)} />
          </div>
        </div>
      </Grid>
    </Container>
  );
};

export default Header;
