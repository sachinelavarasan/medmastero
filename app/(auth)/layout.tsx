'use client';

import React from 'react';

import { useThemeData } from '../../utils/hooks/useThemeData';
import { darkThemeData, lightThemeData } from '@/utils/theme-image';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-screen">
      <div
        className="h-screen p-3 hidden dark:block"
        style={{
          backgroundImage: `url(${darkThemeData?.authBgImg.src})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}>
        <div className="h-full w-full">{children}</div>
      </div>
      <div
        className="h-screen p-3 block dark:hidden"
        style={{
          backgroundImage: `url(${lightThemeData?.authBgImg.src})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}>
        <div className="h-full w-full">{children}</div>
      </div>
    </section>
  );
}
