'use client';
import { useAtom } from 'jotai';

import { searchAtom } from '@/shared/atom';

export function useHydrateJotai() {
  const [, setSearch] = useAtom(searchAtom);

  return {
    hydrateJotaiState: (state: any) => {
      setSearch(state);
    },
  };
}
