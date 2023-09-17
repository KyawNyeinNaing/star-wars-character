import * as React from 'react';

import { cn } from '@/utils/cn';
import { Image } from './Image';
import { PeopleResult } from '@/types';
import { Text } from './Typography';
import styled from 'styled-components';
import useItemList from '@/hooks/useAtomReducer';
import { TYPES } from '@/utils/enum';

interface Props {
  data: PeopleResult;
  className?: string;
  urlId?: number;
}

export const Card = React.forwardRef<HTMLDivElement, Props>(
  ({ data, urlId = 0, className }: Props, ref) => {
    return (
      <CardWrap ref={ref} className={cn('w-auto rounded-sm overflow-hidden', className)}>
        <Image
          src={`https://starwars-visualguide.com/assets/img/characters/${urlId + 1}.jpg`}
          width={400}
          height={550}
          alt="character image"
        />
        <div className="px-[20px] py-[35px] relative bg-[#1a1a1a]">
          <CardDecalRight className="absolute right-[20px] top-0 w-[12px] h-[8px]" />
          <CardDecalLeft className="absolute top-[20px] w-[24px] z-10 left" />
          <Text as="p" size="6">
            {data?.name}
          </Text>
        </div>
        <CardFooter className="bg-initial h-[7px] relative -m-[1px]" />
      </CardWrap>
    );
  }
);

Card.displayName = 'Card';

const CardWrap = styled.div`
  &:hover {
    & .left {
      &:before,
      &:after {
        border-top-color: #fff;
        border-bottom-color: #fff;
        box-shadow: 0 0 6px 2px;
      }
    }
  }
`;

const CardDecalLeft = styled.div`
  &:before,
  &:after {
    border-top: 2px solid hsla(0, 0%, 100%, 0.2);
    border-bottom: 2px solid hsla(0, 0%, 100%, 0.2);
    border-radius: 2px;
    box-shadow: none;
    content: '';
    position: absolute;
    transition: box-shadow 0.3s ease;
  }
  &:before {
    width: 16px;
  }
  &:after {
    width: 4px;
    left: 20px;
  }
`;

const CardDecalRight = styled.div`
  &:before,
  &:after {
    background: #ffffff33;
    border-radius: 0 0 2px 2px;
    content: '';
    height: 100%;
    position: absolute;
    width: 4px;
  }
  &:before {
    right: -5px;
  }
`;

const CardFooter = styled.div`
  &:before,
  &:after {
    content: '';
    border-top: 7px solid #1a1a1a;
    bottom: 0;
    position: absolute;
    top: auto;
  }
  &:before {
    border-right: 7px solid transparent;
    left: 0;
    width: 58%;
  }
  &:after {
    border-left: 7px solid transparent;
    right: 0;
    width: 40px;
  }
`;
