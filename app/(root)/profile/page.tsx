import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@radix-ui/react-label';
import React from 'react';
import PersonalForm from './_components/personal';
import CompanyForm from './_components/company';

function Profile() {
  return (
    <div className="px-[46px] w-full h-full">
      <header className="flex justify-between items-center border-[#E5E4E4] dark:border-[#132826] border-b-[1.5px] pb-4">
        <div>
          <h1 className="text-[24px] font-bold">Profile</h1>
          <span className="text-[#777777] text-[16px] font-semibold">
            Update your personal details and your photo here
          </span>
        </div>
        <div className="flex gap-4">
          <Button variant="cancel" type="button">
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </header>
      <Tabs defaultValue="personal" className="w-full mt-4">
        <TabsList className="grid w-[400px] h-full grid-cols-2 bg-transparent border-[#00BBA8] border-[1.5px] rounded-[10px]">
          <TabsTrigger
            value="personal"
            className="text-[16px] text-[#777777] dark:text-[#C3C3C3] font-bold data-[state=active]:bg-[#00BBA8] data-[state=active]:text-[#FFFFFF] dark:data-[state=active]:text-[#FFFFFF]">
            Personal
          </TabsTrigger>
          <TabsTrigger
            value="company"
            className="text-[16px] text-[#777777] dark:text-[#C3C3C3] font-bold data-[state=active]:bg-[#00BBA8] data-[state=active]:text-[#FFFFFF] dark:data-[state=active]:text-[#FFFFFF]">
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
