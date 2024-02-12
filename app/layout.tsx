import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/globals.css';
import React from 'react';
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
    <html lang='en' suppressHydrationWarning={true}>
      <body className={`${inter.className} bg-[#FFFFFF] dark:bg-[#0C1615]`}>
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
