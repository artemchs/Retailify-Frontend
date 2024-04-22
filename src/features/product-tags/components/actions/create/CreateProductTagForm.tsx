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
import SaveButton from '@/components/forms/SaveButton'
import { createProductTagFormSchema } from '@/features/product-tags/types/create-product-tag-form-schema'
import ProductTags from '@/api/services/ProductTags'
import { productTagName } from '../../shared/placeholders'
import { ProductTag } from '@/types/entities/ProductTag'
import { CreateProductTagDialogProps } from './CreateProductTagDialog'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
} & CreateProductTagDialogProps

export default function CreateProductTagForm({
  setIsOpened,
  selectedValues,
  setSelectedValues,
}: Props) {
  const form = useForm<z.infer<typeof createProductTagFormSchema>>({
    resolver: zodResolver(createProductTagFormSchema),
    defaultValues: {
      name: '',
    },
  })

  function onSuccess(data: ProductTag) {
    setIsOpened(false)
    toast('Новый тег был успешно добавлен.', {
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })

    if (setSelectedValues) {
      const newArray = selectedValues ?? []
      newArray.push(data)
      setSelectedValues(newArray)
    }
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = ProductTags.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof createProductTagFormSchema>) {
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
                  <Input placeholder={productTagName} {...field} />
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
