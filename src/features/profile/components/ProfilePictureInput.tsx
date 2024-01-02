import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UploadCloud } from 'lucide-react'
import { useMemo, useRef } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'profilePicture'>
  imageUrl?: string
  fallback: string
  form: UseFormReturn<
    {
      fullName: string
      email: string
      profilePicture?: File
    },
    unknown,
    undefined
  >
}

export default function ProfilePictureInput({
  field,
  imageUrl,
  fallback,
  form,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const fileUrl = useMemo(() => {
    return field.value ? URL.createObjectURL(field.value) : undefined
  }, [field.value])

  return (
    <>
      <input
        className='hidden'
        type='file'
        ref={inputRef}
        accept='image/*'
        onChange={(e) => form.setValue('profilePicture', e.target.files?.[0])}
      />
      <Avatar className='h-24 w-24 relative'>
        <div
          onClick={() => inputRef.current?.click()}
          className='opacity-0 hover:opacity-100 backdrop-blur-sm backdrop-brightness-75 transition-all cursor-pointer flex absolute h-full w-full justify-center items-center'
        >
          <UploadCloud className='absolute text-opacity-0 h-6 w-6' />
        </div>
        <AvatarImage
          className='object-cover'
          src={field.value ? fileUrl : imageUrl}
        />
        <AvatarFallback className='text-2xl'>{fallback}</AvatarFallback>
      </Avatar>
    </>
  )
}
