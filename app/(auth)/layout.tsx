'use client';

import Image from 'next/image';
import React from 'react';

import { useThemeData } from '../../utils/hooks/useThemeData';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentTheme] = useThemeData();

  return (
    <section className='h-screen'>
      <div className='flex h-screen p-3'>
        <div className='flex-1'>{children}</div>
        <div className='flex-1 lg:hidden'>
          <Image
            src={currentTheme?.authBgImg}
            alt='auth image'
            className='h-full w-full'
            placeholder='empty'
          />
        </div>
      </div>
    </section>
  );
}
