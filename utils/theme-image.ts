'use client';

import { StaticImageData } from 'next/image';

// dark theme icons
import darkBg from '../public/images/auth-dark-bg.png';
import darkAuthIcon from '../public/icons/app-logo-dark.svg';
import succesTickDarkIcon from '../public/icons/success-dark.svg';
import uploadImageIcon from '@/public/icons/upload-image.svg';
import uploadCloudDarkIcon from '@/public/icons/upload-cloud-dark.svg';
import uploadBtnDarkIcon from '@/public/icons/upload-btn-dark.svg';

// light theme icons
import lightBg from '../public/images/auth-light-bg.png';
import lightAuthIcon from '../public/icons/app-logo-light.svg';
import succesTickLightIcon from '../public/icons/success-light.svg';
import uploadImageLightIcon from '@/public/icons/upload-image-light.svg';
import uploadCloudLightIcon from '@/public/icons/upload-cloud-light.svg';
import uploadBtnLightIcon from '@/public/icons/upload-btn-light.svg';

// common icon
import notificationIcon from '../public/icons/notification.svg';
import unreadNotificationIcon from '../public/icons/unread-notification.svg';
import forgotPasswordImg from '../public/icons/forgot-password.svg';
import resetPasswordImg from '../public/icons/reset-password.svg';
import dropdownUserIcon from '../public/icons/user.svg';
import LogoutIcon from '../public/icons/logout.svg';
import dropdownCartIcon from '../public/icons/cart.svg';

// Themes type interface
export interface ThemeDataProps {
  authBgImg: StaticImageData;
  authIcon: StaticImageData;
  successTickIcon: StaticImageData;
  fileUploadIcon: StaticImageData;
  uploadCloudIcon: StaticImageData;
  uploadBtnIcon: StaticImageData;
}
// Common Icons and Images type interface
export interface CommonDataProps {
  notificationIcon: StaticImageData;
  unreadNotificationIcon: StaticImageData;
  forgotPasswordImg: StaticImageData;
  resetPasswordImg: StaticImageData;
  dropdownUserIcon: StaticImageData;
  LogoutIcon: StaticImageData;
  dropdownCartIcon: StaticImageData;
}

// dark theme icons
export const darkThemeData: ThemeDataProps = {
  authBgImg: darkBg,
  authIcon: darkAuthIcon,
  successTickIcon: succesTickDarkIcon,
  fileUploadIcon: uploadImageIcon,
  uploadCloudIcon: uploadCloudDarkIcon,
  uploadBtnIcon: uploadBtnDarkIcon,
};

// light theme icons
export const lightThemeData: ThemeDataProps = {
  authBgImg: lightBg,
  authIcon: lightAuthIcon,
  successTickIcon: succesTickLightIcon,
  fileUploadIcon: uploadImageLightIcon,
  uploadCloudIcon: uploadCloudLightIcon,
  uploadBtnIcon: uploadBtnLightIcon,
};

// common icons and images
export const commonIcon: CommonDataProps = {
  notificationIcon: notificationIcon,
  unreadNotificationIcon: unreadNotificationIcon,
  forgotPasswordImg: forgotPasswordImg,
  resetPasswordImg: resetPasswordImg,
  dropdownUserIcon: dropdownUserIcon,
  LogoutIcon: LogoutIcon,
  dropdownCartIcon: dropdownCartIcon,
};
