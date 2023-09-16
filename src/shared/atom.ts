'use client';
import { PeopleResult } from '@/types';
import { atom } from 'jotai';

export const searchAtom = atom<string>('');
export const peopleAtom = atom<PeopleResult[]>([]);
