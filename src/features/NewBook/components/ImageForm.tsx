import { StatusSelect } from '@/src/components/StatusSelect';
import { Dialog, DialogTrigger } from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { ImageOff } from 'lucide-react';
import { ImageDialog } from './ImageDialog';
import { Dispatch, SetStateAction } from 'react';
import { Status } from '@/src/data/types/books';
import { Button } from '@/src/components/ui/button';
import { ImageFormProps } from '../types';
import { ImageTrigger } from './ImageTrigger';

export const ImageForm = ({
  register,
  status,
  setStatus,
  handleFileChange,
  choosedFile,
  setChoosedFile,
  showImage,
  chooseImageError,
  handleImageError,
  cleanCurrentImage,
}: ImageFormProps) => (
  <div className="col-span-2 flex flex-col gap-4 p-4">
    <div className="flex flex-col gap-4 sm:grid grid-cols-2 sm:space-x-2">
      <div className="space-y-2 cols-span-1">
        <Label>Nota</Label>
        <Input
          type="number"
          placeholder="Ex: 10"
          {...register('rating', {
            setValueAs: (val) => (val === '' ? undefined : Number(val)),
          })}
        />
      </div>

      <div className="space-y-2 cols-span-1">
        <Label>Status</Label>
        <StatusSelect
          value={status}
          onValueChange={setStatus as Dispatch<SetStateAction<Status>>}
          className="w-full"
        />
      </div>
    </div>

    <Dialog>
      <DialogTrigger>
        <ImageTrigger
          showImage={showImage}
          choosedFile={choosedFile}
          handleImageError={handleImageError}
        />
      </DialogTrigger>

      {choosedFile && (
        <Button
          variant="destructive"
          className="w-full h-8"
          onClick={cleanCurrentImage}
        >
          <ImageOff />
        </Button>
      )}

      <ImageDialog
        choosedFile={choosedFile}
        handleFileChange={handleFileChange}
        setChoosedFile={setChoosedFile}
        showImage={showImage}
        chooseImageError={chooseImageError}
      />
    </Dialog>
  </div>
);
