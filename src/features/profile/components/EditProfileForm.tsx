import { useForm } from 'react-hook-form'
import { editProfileDialogFormSchema } from './edit-profile-dialog-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { emailPlaceholder, fullNamePlaceholder } from '@/features/placeholders'
import { DialogFooter } from '@/components/ui/dialog'
import { Loader2, Save } from 'lucide-react'
import ProfilePictureInput from './ProfilePictureInput'
import { getNameShorthand } from '@/utils/getNameShorthand'
import AsyncInput from '@/components/forms/AsyncInput'

type Props = {
  email: string
  fullName: string
  profilePictureUrl?: string
  onSubmit(values: z.infer<typeof editProfileDialogFormSchema>): void
  isLoading: boolean
  isError: boolean
  isPending: boolean
}

export default function EditProfileForm({
  email,
  fullName,
  profilePictureUrl,
  onSubmit,
  isError,
  isLoading,
  isPending,
}: Props) {
  const form = useForm<z.infer<typeof editProfileDialogFormSchema>>({
    resolver: zodResolver(editProfileDialogFormSchema),
    defaultValues: {
      email,
      fullName,
    },
  })

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='profilePicture'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex w-full h-full justify-center items-center'>
                    <ProfilePictureInput
                      fallback={getNameShorthand(fullName)}
                      field={field}
                      imageUrl={profilePictureUrl}
                      form={form}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Електронная почта' />
                <FormControl>
                  <AsyncInput
                    input={
                      <Input
                        type='email'
                        placeholder={emailPlaceholder}
                        {...field}
                      />
                    }
                    isError={isError}
                    isLoading={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Полное имя' />
                <FormControl>
                  <Input placeholder={fullNamePlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter className='mt-4'>
        <Button type='submit' disabled={isPending} onClick={form.handleSubmit(onSubmit)}>
          {isPending ? (
            <Loader2 className='h-4 w-4 mr-2 animate-spin' />
          ) : (
            <Save className='h-4 w-4 mr-2' />
          )}
          Сохранить
        </Button>
      </DialogFooter>
    </>
  )
}
