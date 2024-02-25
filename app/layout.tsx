import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './styles/globals.css';

import ThemeWrapper from '../utils/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MedMastero',
  description: 'MedMastero is used for finding medicine within your range',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
        `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-[#FFFFFF] dark:bg-app_dark_bg`}>
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
