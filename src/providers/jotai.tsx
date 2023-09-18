'use client';

import * as React from 'react';
import { createStore, Provider } from 'jotai';

const store = createStore();

export function JotaiProvider({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}
