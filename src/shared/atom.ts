'use client';
import { atom } from 'jotai';

import { PeopleResult } from '@/types';

export const searchAtom = atom<string>('');
export const peopleAtom = atom<PeopleResult[]>([]);
