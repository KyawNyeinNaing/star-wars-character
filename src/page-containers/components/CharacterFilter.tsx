import React from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';

interface Props {
  filterData: any[];
  selectedValue: any;
  placeholder: string;
}

const CharacterFilter: React.FC<Props> = ({ filterData, selectedValue, placeholder }: Props) => {
  return (
    <>
      <Select
        onValueChange={value => {
          selectedValue(value);
        }}
      >
        <SelectTrigger className="h-8 w-[200px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent side="top">
          {filterData?.map((each, key) => {
            return (
              <SelectItem key={key} value={each?.name ? each?.name : each?.title}>
                {each?.name ? each?.name : each?.title}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};

export default CharacterFilter;
