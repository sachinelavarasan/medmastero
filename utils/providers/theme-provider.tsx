'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  // this line is the key to avoid the error.
  if (!hasMounted) return <>{children}</>;
  return <ThemeProvider attribute='class'>{children}</ThemeProvider>;
}
