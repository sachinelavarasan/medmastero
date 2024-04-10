import { ChangeEvent, useState } from 'react';

import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import '@/app/styles/file-input.css';

interface InputFileProps extends InputProps {
  label?: string;
  inputClass?: string;
  containerClass?: string;
}

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);
  return { files, displayUrl };
}

export function InputFile({ label, inputClass, containerClass, ...rest }: InputFileProps) {
  const [preview, setPreview] = useState('');
  return (
    <div className={cn('grid w-full items-center gap-1.5', containerClass)}>
      {label && <Label htmlFor="file-upload">Picture</Label>}
      {preview && (
        <div className="w-24 h-24">
          <img src={preview} className="w-full h-full object-contain" />
        </div>
      )}
      <div className="relative">
        <Input
          {...rest}
          id="file-upload"
          type="file"
          className={cn('h-20 w-full custom-input-style', inputClass)}
          onChange={(event) => {
            const { files, displayUrl } = getImageData(event);
            setPreview(displayUrl);
          }}
        />
      </div>
    </div>
  );
}
