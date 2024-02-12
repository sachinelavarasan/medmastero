'use client';

import { useTheme } from 'next-themes';
import React from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}
