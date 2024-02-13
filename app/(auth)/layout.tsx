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
      <div className='flex h-screen p-3' style={{backgroundImage:`url(${currentTheme?.authBgImg.src})`,  backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
       }}>
        <div className='flex-1'>{children}</div>
      </div>
    </section>
  );
}
