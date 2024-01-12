import { useForm } from 'react-hook-form'
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
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { DialogFooter } from '@/components/ui/dialog'
import { Loader2, Save } from 'lucide-react'
import { updatePasswordDialogFormSchema } from './update-password-dialog-form-schema'
import PasswordInput from '@/features/auth/components/PasswordInput'

type Props = {
  onSubmit(values: z.infer<typeof updatePasswordDialogFormSchema>): void
  isPending: boolean
}

export default function UpdatePasswordForm({ onSubmit, isPending }: Props) {
  const form = useForm<z.infer<typeof updatePasswordDialogFormSchema>>({
    resolver: zodResolver(updatePasswordDialogFormSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  })

  return (
    <>
      <Form {...form}>
        <form className='space-y-4'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Новый пароль' />
                <FormControl>
                  <PasswordInput placeholder='Ваш новый пароль' field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='passwordConfirm'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Подтвердите новый пароль' />
                <FormControl>
                  <PasswordInput
                    placeholder='Подтвердите ваш новый пароль'
                    field={field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter className='mt-4'>
        <Button disabled={isPending} onClick={form.handleSubmit(onSubmit)}>
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
