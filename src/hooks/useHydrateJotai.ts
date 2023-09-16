'use client';
import { searchAtom } from '@/shared/atom';
import { useAtom } from 'jotai';

export function useHydrateJotai() {
  const [, setSearch] = useAtom(searchAtom);

  return {
    hydrateJotaiState: (state: any) => {
      setSearch(state);
    },
  };
}
