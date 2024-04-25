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
import { Variant } from '@/types/entities/Variant'
import { editVariantFormSchema } from '../../../types/edit-variant-form-schema'
import Products from '@/api/services/Products'  
import ProductVariantSaleInput from '../../shared/ProductVariantSaleInput'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  data?: Variant
  id: string
  isLoading: boolean
  isError: boolean
  productId: string
}

export default function EditProductVariantForm({
  setIsOpened,
  id,
  isError,
  isLoading,
  data,
  productId,
}: Props) {
  const form = useForm<z.infer<typeof editVariantFormSchema>>({
    resolver: zodResolver(editVariantFormSchema),
    defaultValues: {
      price: data?.price,
      sale: data?.sale ?? undefined,
      size: data?.size,
    },
  })

  function defaultOnSuccess() {
    setIsOpened(false)
    toast('Вариант товара был успешно отредактирован.', {
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Products.useEditVariant({
    setErrorMessage,
    onSuccess: defaultOnSuccess,
    id,
    productId,
  })

  function onSubmit(values: z.infer<typeof editVariantFormSchema>) {
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
            name='size'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Размер' />
                <FormControl>
                  <AsyncInput
                    input={<Input {...field} />}
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
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Цена продажи (грн)' />
                <FormControl>
                  <AsyncInput
                    input={<Input type='number' {...field} />}
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
            name='sale'
            render={({ field }) => (
              <ProductVariantSaleInput
                field={field}
                form={form}
                isError={isError}
                isLoading={isLoading}
              />
            )}
          />
          <SaveButton isPending={isPending} form={form} onSubmit={onSubmit} />
        </form>
      </Form>
    </div>
  )
}
