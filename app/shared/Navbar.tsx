'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from "next/navigation"

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
// import { Input } from '@/components/ui/input';
//import { Label } from '@/components/ui/label';

import { useThemeData } from '@/utils/hooks/useThemeData';
import { commonIcon } from '@/utils/theme-image';
import ThemeSwitch from '@/components/ThemeSwitch';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/lib/stores/user-store';

export default function Navbar() {
  const [currentTheme] = useThemeData();
  const { currentUser, setUser } = useUserStore((state) => state);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session?.user]);

  return (
    <header className="fixed flex w-full h-[70px] bg-[#FFFFFF] dark:bg-app_dark_bg items-center justify-between border-[#E5E4E4] dark:border-[#132826] border-b-[1px] shadow-sm px-3">
      <div>
        <Sheet>
          <SheetTrigger className="hidden md:block">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent
            side={'left'}
            className="bg-[#FFFFFF] dark:bg-app_dark_bg border-[#E5E4E4] dark:border-[#132826] w-[25rem] sm:w-[20rem] xs:w-[16rem]">
            <SheetHeader className="flex flex-row items-center justify-between space-y-0">
              <Link href="/" className="cursor-pointer">
                <Image
                  src={currentTheme?.authIcon}
                  alt="auth icon"
                  className="h-full w-[180px]"
                  placeholder="empty"
                  priority
                />
              </Link>
              <SheetClose className="rounded opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 data-[state=open]:bg-secondary border-[#008778]">
                <X className="h-4 w-4 text-[#008778]" />
                <span className="sr-only">Close</span>
              </SheetClose>
            </SheetHeader>
            <div className="flex flex-col gap-2 mt-4">
              <div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-col gap-4">
                    <Avatar className="border-[1.5px] border-[#008778] h-16 w-16">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        className="p-1 h-full w-full rounded-full"
                      />
                      <AvatarFallback className="p-1 h-full w-full rounded-full">CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#000000] dark:text-[#FFFFFF] text-[1rem] font-bold text-center">
                      {currentUser?.us_fullname}
                    </span>
                    <span className="text-[#787878] dark:text-[#C3C3C3] text-[0.875rem] font-normal mt-2  text-center">
                      {currentUser?.us_email}
                    </span>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-[#E5E4E4] dark:bg-[#132826]" />
              <button
                className="flex items-center gap-2 h-[44px] focus-within:bg-[#E5E5E473] dark:focus-within:bg-[#132826] dark:text-[#C3C3C3] text-[#777777] font-medium rounded-sm px-3"
                onClick={() => router.push('/profile')}>
                <Image
                  src={commonIcon?.dropdownUserIcon}
                  alt="auth icon"
                  className="h-[20px] w-[20px]"
                  placeholder="empty"
                  priority
                />
                View profile
              </button>
              <Link
                className="flex items-center gap-2 h-[44px] focus-within:bg-[#E5E5E473] dark:focus-within:bg-[#132826] dark:text-[#C3C3C3] text-[#777777] font-medium rounded-sm px-3"
                href="/">
                <Image
                  src={commonIcon?.dropdownCartIcon}
                  alt="auth icon"
                  className="h-[24px] w-[24px]"
                  placeholder="empty"
                  priority
                />
                Your orders
              </Link>
              <DropdownMenuSeparator className="bg-[#E5E4E4]  dark:bg-[#132826]" />
              <Link
                className="flex items-center gap-2 h-[44px] focus-within:bg-[#E5E5E473] dark:focus-within:bg-[#132826] dark:text-[#C3C3C3] text-[#777777] font-medium rounded-sm px-3"
                href="/">
                <Image
                  src={commonIcon?.LogoutIcon}
                  alt="auth icon"
                  className="h-[24px] w-[24px]"
                  placeholder="empty"
                  priority
                />
                Logout
              </Link>
            </div>
            <DropdownMenuSeparator className="bg-[#E5E4E4]  dark:bg-[#132826] my-4" />
            <ThemeSwitch />
            <SheetFooter className="px-4 absolute bottom-5 flex sm:justify-center w-full right-0 left-0">
              <button className="bg-app_green w-full py-1.5 rounded text-[#fff]" type="button">
                <div>Contact Us</div>
              </button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <Link href="/" className="cursor-pointer">
          <Image
            src={currentTheme?.authIcon}
            alt="auth icon"
            className="md:hidden h-[40px] w-[175px]"
            placeholder="empty"
            priority
          />
        </Link>
      </div>
      <div className="flex gap-5 items-center">
        <Button className="rounded-[2.5rem] md:hidden h-9">Contact us</Button>
        <div className="relative">
          <Image src={commonIcon?.notificationIcon} alt="auth icon" placeholder="empty" priority />
          <span className="absolute flex h-2.5 w-2.5 top-0 -right-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EA393E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EA393E]"></span>
          </span>
        </div>
        <div className="md:hidden">
          <ThemeSwitch />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:outline-none">
            <Avatar className="border-[1.5px] border-[#008778] h-12 w-12">
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="p-1 h-full w-full rounded-full"
              />
              <AvatarFallback className="p-1 h-full w-full rounded-full">CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 bg-[#FFFFFF] dark:bg-app_dark_bg border-[#E5E4E4] border-[1px] dark:border-[#132826] shadow-md">
            <DropdownMenuLabel>
              <div className="flex items-center gap-2">
                <div>
                  <Avatar className="border-[1.5px] border-[#008778] h-12 w-12">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      className="p-1 h-full w-full rounded-full"
                    />
                    <AvatarFallback className="p-1 h-full w-full rounded-full">CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex justify-center flex-col">
                  <span className="text-[#000000] dark:text-[#FFFFFF] text-[14px] font-bold">
                    {currentUser?.us_fullname}
                  </span>
                  <span className="text-[#787878] dark:text-[#C3C3C3] text-[12px] font-normal">
                    {currentUser?.us_email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#E5E4E4] dark:bg-[#132826]" />
            <DropdownMenuItem className="h-[40px] focus:bg-[#E5E5E473] dark:focus:bg-[#132826]">
              <button
                className="flex items-center gap-2 dark:text-[#C3C3C3] text-[#777777] font-medium"
                onClick={() => router.push('/profile')}>
                <Image
                  src={commonIcon?.dropdownUserIcon}
                  alt="auth icon"
                  className="h-[20px] w-[20px]"
                  placeholder="empty"
                  priority
                />
                View profile
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 h-[40px] focus:bg-[#E5E5E473] dark:focus:bg-[#132826] dark:text-[#C3C3C3] text-[#777777] font-medium">
              <Image
                src={commonIcon?.dropdownCartIcon}
                alt="auth icon"
                className="h-[24px] w-[24px]"
                placeholder="empty"
                priority
              />
              Your orders
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#E5E4E4]  dark:bg-[#132826]" />
            <DropdownMenuItem className="flex items-center gap-2 h-[44px] focus:bg-[#E5E5E473] dark:focus:bg-[#132826] dark:text-[#C3C3C3] text-[#777777] font-medium">
              <Image
                src={commonIcon?.LogoutIcon}
                alt="auth icon"
                className="h-[24px] w-[24px]"
                placeholder="empty"
                priority
              />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
