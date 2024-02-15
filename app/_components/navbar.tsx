'use client';

import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useThemeData } from '@/utils/hooks/useThemeData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const [currentTheme] = useThemeData();
  return (
    <header className="flex h-[70px] bg-[#FFFFFF] dark:bg-[#0C1615] items-center justify-between border-[#E5E4E4] dark:border-[#132826] border-b-[1px] shadow-sm px-3">
      <div>
        <Image
          src={currentTheme?.authIcon}
          alt="auth icon"
          className="h-[40px] w-[175px] md:h-[30px] md:w-[150px]"
          placeholder="empty"
          priority
        />
      </div>
      <div className="flex gap-8 items-center">
        <Button className="rounded-[2.5rem]">Contact us</Button>

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
          <DropdownMenuContent className="mr-4 bg-[#FFFFFF] dark:bg-[#0C1615] border-[#E5E4E4] border-[1px] dark:border-[#132826] shadow-md">
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
                    James bond
                  </span>
                  <span className="text-[#787878] dark:text-[#C3C3C3] text-[12px] font-normal">
                    jamesbond@gmail.com
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#E5E4E4] dark:bg-[#132826]" />
            <DropdownMenuItem className="h-[40px] focus:bg-[#E5E5E473] dark:focus:bg-[#132826] dark:text-[#C3C3C3] text-[#777777] font-medium">
              View profile
            </DropdownMenuItem>
            <DropdownMenuItem className="h-[40px] focus:bg-[#E5E5E473] dark:focus:bg-[#132826] dark:text-[#C3C3C3] text-[#777777] font-medium">
              Your orders
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#E5E4E4]  dark:bg-[#132826]" />
            <DropdownMenuItem className="h-[44px] focus:bg-[#E5E5E473] dark:focus:bg-[#132826] dark:text-[#C3C3C3] text-[#777777] font-medium">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
