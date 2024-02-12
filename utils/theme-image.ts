'use client';
import { StaticImageData } from 'next/image';
import darkBg from '../public/images/auth-left-bg-dark.png';
import lightBg from '../public/images/auth-left-bg-light.png';
import darkAuthIcon from '../public/icons/medmastero-dark.svg';
import lightAuthIcon from '../public/icons/medmastero-light.svg';

export interface ThemeDataProps {
  authBgImg: StaticImageData;
  authIcon: StaticImageData;
}

export const darkThemeData: ThemeDataProps = {
  authBgImg: darkBg,
  authIcon: darkAuthIcon,
};
export const lightThemeData: ThemeDataProps = {
  authBgImg: lightBg,
  authIcon: lightAuthIcon,
};
