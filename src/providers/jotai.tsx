'use client';

import * as React from 'react';
import { Provider, createStore } from 'jotai';

const store = createStore();

export function JotaiProvider({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}
