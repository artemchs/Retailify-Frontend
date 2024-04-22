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
import { ProductTag } from '@/types/entities/ProductTag'
import { editProductTagFormSchema } from '@/features/product-tags/types/edit-product-tag-form-schema'
import ProductTags from '@/api/services/ProductTags'
import { productTagName } from '../../shared/placeholders'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  data?: ProductTag
  id: string
  isLoading: boolean
  isError: boolean
  onSuccess?: (id: string) => void
}

export default function EditProductTagForm({
  setIsOpened,
  id,
  isError,
  isLoading,
  data,
  onSuccess,
}: Props) {
  const form = useForm<z.infer<typeof editProductTagFormSchema>>({
    resolver: zodResolver(editProductTagFormSchema),
    defaultValues: {
      name: data?.name,
    },
  })

  function defaultOnSuccess() {
    setIsOpened(false)
    toast('Тег был успешно отредактирован.', {
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })

    if (onSuccess) {
      onSuccess(id)
    }
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = ProductTags.useEdit({
    setErrorMessage,
    onSuccess: defaultOnSuccess,
    id,
  })

  function onSubmit(values: z.infer<typeof editProductTagFormSchema>) {
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
                  <AsyncInput
                    input={<Input placeholder={productTagName} {...field} />}
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
