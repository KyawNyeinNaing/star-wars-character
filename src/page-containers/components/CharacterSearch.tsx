'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';

import { Autocomplete, Item } from '@/components/Autocomplete';
import useItemList from '@/hooks/useAtomReducer';
import { TYPES } from '@/utils/enum';

const CharacterSearch: React.FC = () => {
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
    <div className="border-none rounded-[5px] w-[250px] h-[40px] outline-none text-white text-[16px] relative">
      <Autocomplete
        className="w-[250px]"
        ref={comboboxRef}
        setValue={setSearchValue}
        onChange={debouncedOnChange}
      >
        {matches?.length ? (
          matches?.map((each, key) => (
            <Item key={key} className="combobox-item" value={each?.name}>
              {each?.name}
            </Item>
          ))
        ) : (
          <div className="no-results">No results found</div>
        )}
      </Autocomplete>
    </div>
  );
};

export default CharacterSearch;
