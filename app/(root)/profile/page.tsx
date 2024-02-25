import React from 'react';

import { Button } from '@/components/ui/button';
import { ButtonWithLoader } from '@/components/Button';
// import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Label } from '@radix-ui/react-label';

import PersonalForm from './_components/personal';
import CompanyForm from './_components/company';

function Profile() {
  return (
    <div className="px-[46px] w-full h-full">
      <Tabs defaultValue="personal" className="w-full mt-4">
        <TabsList className="grid w-[400px] h-full grid-cols-2 bg-transparent border-app_green border-[1.5px] rounded-[10px]">
          <TabsTrigger
            value="personal"
            className="text-[16px] text-[#777777] dark:text-[#C3C3C3] font-bold data-[state=active]:bg-app_green data-[state=active]:text-[#FFFFFF] dark:data-[state=active]:text-[#FFFFFF]">
            Personal
          </TabsTrigger>
          <TabsTrigger
            value="company"
            className="text-[16px] text-[#777777] dark:text-[#C3C3C3] font-bold data-[state=active]:bg-app_green data-[state=active]:text-[#FFFFFF] dark:data-[state=active]:text-[#FFFFFF]">
            Company
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <PersonalForm />
        </TabsContent>
        <TabsContent value="company">
          <CompanyForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Profile;
