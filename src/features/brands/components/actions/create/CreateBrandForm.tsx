import Brands from '@/api/services/Brands'
import { createBrandFormSchema } from '@/features/brands/types/create-brand-form-schema'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { AlertDestructive } from '@/components/AlertDestructive'
import { zodResolver } from '@hookform/resolvers/zod'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { Input } from '@/components/ui/input'
import { brandName } from '../../shared/placeholders'
import SaveButton from '@/components/forms/SaveButton'
import { CreateBrandDialogProps } from './CreateBrandDialog'
import { Brand } from '@/types/entities/Brand'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
} & CreateBrandDialogProps

export default function CreateBrandForm({
  setIsOpened,
  setSelectedValue,
}: Props) {
  const form = useForm<z.infer<typeof createBrandFormSchema>>({
    resolver: zodResolver(createBrandFormSchema),
    defaultValues: {
      name: '',
    },
  })

  function onSuccess(data: Brand) {
    setIsOpened(false)
    toast('Новый бренд был успешно добавлен.', {
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })

    if (setSelectedValue) {
      setSelectedValue(data.id)
    }
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Brands.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof createBrandFormSchema>) {
    mutate({
      body: values,
    })
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      {errorMessage && errorMessage.length >= 1 && (
        <AlertDestructive text={errorMessage} />
      )}
      <Form {...form}>
        <form
          className='flex flex-col gap-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Название' />
                <FormControl>
                  <Input placeholder={brandName} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SaveButton isPending={isPending} form={form} onSubmit={onSubmit} />
        </form>
      </Form>
    </div>
  )
}
