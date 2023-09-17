'use client';
import { Container, Grid } from '@radix-ui/themes';
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Icons } from '../Image';
import { Input } from '../Input';
import { useAtom } from 'jotai';
import { searchAtom } from '@/shared/atom';
import { useRouter, useSearchParams } from 'next/navigation';
import { debounce } from 'lodash';
import { Autocomplete, Item } from '../Autocomplete';
import { matchSorter } from 'match-sorter';
import useItemList from '@/hooks/useAtomReducer';
import { TYPES } from '@/utils/enum';
import { PeopleResult } from '@/types';

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const router = useRouter();
  const comboboxRef = useRef<any>(null);
  const { items } = useItemList(TYPES.CHARACTER_LIST);

  useEffect(() => {
    if (!searchValue) {
      router.push('/');
    } else {
      router.push(`/?search=${searchValue}`);
    }
  }, [searchValue, router]);

  const debouncedOnChange = debounce(() => {
    setSearchValue(comboboxRef?.current?.value);
  }, 500);

  const matches = useMemo(() => {
    if (!searchValue) {
      return items?.peopleList || [];
    } else {
      return items?.peopleList?.filter(each => each.name.includes(searchValue)) || [];
    }
  }, [searchValue, items?.peopleList]);

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
            <Autocomplete ref={comboboxRef} setValue={setSearchValue} onChange={debouncedOnChange}>
              {matches?.map((each, key) => (
                <Item key={key} className="combobox-item" value={each?.name}>
                  {each?.name}
                </Item>
              ))}
            </Autocomplete>
          </div>
        </div>
      </Grid>
    </Container>
  );
};

export default Header;
