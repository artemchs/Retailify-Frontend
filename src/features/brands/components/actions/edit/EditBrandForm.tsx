import SaveButton from '@/components/forms/SaveButton'
import { zodResolver } from '@hookform/resolvers/zod'
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
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { Input } from '@/components/ui/input'
import AsyncInput from '@/components/forms/AsyncInput'
import { Brand } from '@/types/entities/Brand'
import { editBrandFormSchema } from '@/features/brands/types/edit-brand-form-schema'
import Brands from '@/api/services/Brands'
import { brandName } from '../../shared/placeholders'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  brand?: Brand
  id: string
  isLoading: boolean
  isError: boolean
}

export default function EditBrandForm({
  setIsOpened,
  id,
  isError,
  isLoading,
  brand,
}: Props) {
  const form = useForm<z.infer<typeof editBrandFormSchema>>({
    resolver: zodResolver(editBrandFormSchema),
    defaultValues: {
      name: brand?.name,
    },
  })

  function defaultOnSuccess() {
    setIsOpened(false)
    toast('Бренд был успешно отредактирован.', {
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Brands.useEdit({
    setErrorMessage,
    onSuccess: defaultOnSuccess,
    id,
  })

  function onSubmit(values: z.infer<typeof editBrandFormSchema>) {
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
        <form className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Название' />
                <FormControl>
                  <AsyncInput
                    input={<Input placeholder={brandName} {...field} />}
                    isError={isError}
                    isLoading={isLoading}
                  />
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
