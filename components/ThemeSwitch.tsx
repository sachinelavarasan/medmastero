'use client';
import React from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from './ui/switch';
import { useTheme } from 'next-themes';

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-mode"
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
      />
      <Label htmlFor="theme-mode">{theme === 'dark' ? 'Dark' : 'Light'}</Label>
    </div>
  );
}

export default ThemeSwitch;
