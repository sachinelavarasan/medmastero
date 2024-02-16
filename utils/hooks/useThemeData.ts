'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { ThemeDataProps, lightThemeData } from '../theme-image';
import { darkThemeData } from '../../utils/theme-image';

export const useThemeData = () => {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<ThemeDataProps>(lightThemeData);

  useEffect(() => {
    setCurrentTheme(() => (theme == 'dark' ? darkThemeData : lightThemeData));
  }, [theme]);

  return [currentTheme];
};
