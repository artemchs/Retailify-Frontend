import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { AlertDestructive } from '@/components/AlertDestructive'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { Input } from '@/components/ui/input'
import SaveButton from '@/components/forms/SaveButton'
import { createVariantFormSchema } from '../../../types/create-variant-form-schema'
import Products from '@/api/services/Products'
import { productVariantPrice, productVariantSize } from '../../../placeholders'
import ProductVariantSaleInput from '../../shared/ProductVariantSaleInput'
import { RowSelectionState } from '@tanstack/react-table'
import SelectProductsDialog from '@/features/products/components/shared/productsDialog/SelectProductsTable'
import getDiscountedPrice from '@/utils/getDiscountedPrice'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateProductVariantForm({ setIsOpened }: Props) {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})

  const form = useForm<z.infer<typeof createVariantFormSchema>>({
    resolver: zodResolver(createVariantFormSchema),
    defaultValues: {
      size: '',
      saleType: 'FIXED-AMOUNT',
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Новый вариант товара был успешно добавлен.', {
      icon: <Plus className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const productId = useWatch({
    control: form.control,
    name: 'product.id',
  })

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Products.useCreateVariant({
    setErrorMessage,
    onSuccess,
    productId,
  })

  function onSubmit(values: z.infer<typeof createVariantFormSchema>) {
    const discountedPrice = getDiscountedPrice(
      values.saleType,
      values.price,
      values.sale
    )

    const sale = values.price - discountedPrice

    mutate({
      body: {
        price: values.price,
        size: values.size,
        sale,
      },
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
            name='product'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Модель товара' />
                <FormControl>
                  <SelectProductsDialog
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    selectedValues={field.value ? [field.value] : []}
                    setSelectedValues={(newValues) => {
                      if (newValues && newValues[0] && newValues[0].id) {
                        form.setValue('product', {
                          id: newValues[0].id,
                          title: newValues[0].title,
                          sku: newValues[0].sku,
                        })
                      } else {
                        form.resetField('product')
                        setSelectedRows({})
                      }
                    }}
                    single={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='size'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Размер' />
                <FormControl>
                  <Input {...field} placeholder={productVariantSize} />
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
                  <Input
                    type='number'
                    {...field}
                    placeholder={productVariantPrice}
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
              <ProductVariantSaleInput field={field} form={form} />
            )}
          />
          <SaveButton isPending={isPending} form={form} onSubmit={onSubmit} />
        </form>
      </Form>
    </div>
  )
}
