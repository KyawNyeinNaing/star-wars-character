import '@/styles/globals.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { fontSans } from '@/configs/fonts';
import { ThemeProvider } from '@/providers/theme';
import { ServerThemeProvider } from '@wits/next-themes';
import Header from '@/components/Layout/Header';
import { JotaiProvider } from '@/providers/jotai';

export const metadata: Metadata = {
  title: 'Star wars character',
  description: 'Star wars character',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ServerThemeProvider>
      <html lang="en" className={fontSans.className}>
        <head />
        <body>
          <JotaiProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Theme>
                <Header />
                {children}
              </Theme>
            </ThemeProvider>
          </JotaiProvider>
        </body>
      </html>
    </ServerThemeProvider>
  );
}
