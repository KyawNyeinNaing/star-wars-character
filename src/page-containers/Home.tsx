'use client';
import { People, PeopleResult } from '@/types';
import React from 'react';

interface Props {
  people: PeopleResult[];
}

const Home: React.FC<Props> = ({ people }: Props) => {
  return <div>Home</div>;
};

export default Home;
