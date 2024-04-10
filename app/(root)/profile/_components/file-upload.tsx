'use client';

import { ChangeEvent, useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import modalCloseIcon from '@/public/icons/modal-close.svg';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ButtonWithLoader } from '@/components/Button';
import { useThemeData } from '@/utils/hooks/useThemeData';
import { upload } from '@/utils/file-upload';

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  let displayUrl: string = '';
  let files: any = [];

  if (event.target.files && event.target.files[0]) {
    if (event.target.files[0].size > 1 * 1000 * 1024) {
      alert('File with maximum size of 1MB is allowed');
      return { files, displayUrl };
    }
  }

  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

  files = dataTransfer.files;
  if (event.target.files?.length) displayUrl = URL.createObjectURL(event.target.files[0]);
  return { files, displayUrl };
}

const FileUpload = ({ className }: { className: string }) => {
  const [currentTheme] = useThemeData();
  const [preview, setPreview] = useState('');
  const [uploads, setUploads] = useState<FileList>();
  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        <Button variant="outline">Change Profile</Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-app_dark_bg bg-[#FFFFFF] rounded-[8px] p-0 border-app_dark_bg max-w-[600px]">
        <DialogHeader className="dark:bg-[#132826] h-[70px] rounded-t-[8px] flex flex-row justify-between p-5 border-[#00BBA8] border-b-[1px] dark:border-opacity-50">
          <DialogTitle className="text-left text-[#00BBA8] font-bold text-[20px]">
            Upload Profile
          </DialogTitle>
          <Image src={modalCloseIcon} alt="close icon" />
        </DialogHeader>
        <div className="p-10">
          <div className="relative border-[#00BBA8] border-[1.5px] border-dashed h-[172px] rounded-[8px] flex flex-col items-center justify-center">
            <input
              id="file-upload"
              type="file"
              accept="image/png,image/jpeg"
              className="custom-input-style"
              onChange={(event) => {
                const { files, displayUrl } = getImageData(event);
                setUploads(files);
                setPreview(displayUrl);
              }}
            />
            <Image src={currentTheme?.fileUploadIcon} alt="upload icon" />
            <p className="mb-0 mt-3 dark:text-[#C3C3C3] text-[#777777] text-[12px] font-medium">
              Drag and Drop file here or <span className="text-[#00BBA8]">choose file</span>
            </p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="mb-0 text-[14px] dark:text-[#C3C3C3] text-[#ADADAD] font-medium">
              Supported Formats:<span className="text-[#00BBA8]"> PNG, JPEG</span>
            </p>
            <p className="mb-0 text-[14px] dark:text-[#C3C3C3] font-medium text-[#ADADAD]">
              Maximum Size:<span className="text-[#00BBA8]"> 1MB</span>
            </p>
          </div>

          <div className="h-[230px] mt-8 flex flex-col items-center justify-center">
            {preview && <img src={preview} className="h-full w-full object-contain " />}
            {uploads?.length && (
              <p className="mt-3 text-[12px] dark:text-[#C3C3C3] text-[#ADADAD] font-medium">
                {uploads?.[0].name}
              </p>
            )}
          </div>
        </div>
        <DialogFooter className="dark:bg-[#132826] h-[86px] rounded-b-[8px] flex flex-row p-5 justify-end border-[#00BBA8] border-t-[1px] dark:border-opacity-50">
          <div className="flex gap-4">
            <DialogClose asChild>
              <Button variant="cancel" type="button">
                Cancel
              </Button>
            </DialogClose>
            <ButtonWithLoader
              label="Save"
              icon={currentTheme?.uploadCloudIcon}
              onClick={() => {
                if (uploads?.length) upload(uploads[0]);
              }}
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileUpload;
