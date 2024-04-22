import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createGoodsReceiptFormSchema } from '../../../types/create-goods-receipt-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { PackagePlus } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'
import GoodsReceipts from '@/api/services/GoodsReceipts'
import { AlertDestructive } from '@/components/AlertDestructive'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import SelectSupplier from '@/features/suppliers/components/shared/SelectSupplier'
import SelectWarehouse from '@/features/warehouses/components/shared/SelectWarehouse'
import SaveButton from '@/components/forms/SaveButton'
import SelectPaymentOption from '../../shared/SelectPaymentOption'
import SelectPaymentTerm from '../../shared/SelectPaymentTerm'
import { DatePickerWithPresets } from '@/components/ui/date-picker'
import SelectProductsVariants from '../../shared/SelectProductVariants'
import ProductVariantsTable from '../../shared/ProductVariantsTable'
import DisplayTotalCost from '../../shared/DisplayTotalCost'

export default function CreateGoodsReceiptForm() {
  const form = useForm<z.infer<typeof createGoodsReceiptFormSchema>>({
    resolver: zodResolver(createGoodsReceiptFormSchema),
    defaultValues: {
      goodsReceiptDate: new Date(),
      supplierId: '',
      warehouseId: '',
      variants: [],
      paymentOption: 'CURRENT_ACCOUNT',
      paymentTerm: 'IN_ADVANCE',
    },
  })

  function onSuccess() {
    toast('Новая накладная прихода была успешно добавлена.', {
      icon: <PackagePlus className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = GoodsReceipts.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof createGoodsReceiptFormSchema>) {
    mutate({ body: values })
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
            name='goodsReceiptDate'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Дата прихода' />
                <DatePickerWithPresets
                  fieldName='goodsReceiptDate'
                  field={field}
                  form={form}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col lg:flex-row gap-4'>
            <FormField
              control={form.control}
              name='warehouseId'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabelForRequiredFields text='Склад' />
                  <SelectWarehouse form={form} field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='supplierId'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabelForRequiredFields text='Поставщик' />
                  <SelectSupplier field={field} form={form} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col lg:flex-row gap-4'>
            <FormField
              control={form.control}
              name='paymentOption'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabelForRequiredFields text='Способ оплаты' />
                  <SelectPaymentOption field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='paymentTerm'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabelForRequiredFields text='Условия оплаты' />
                  <SelectPaymentTerm field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='variants'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Товар' />
                <div className='flex flex-col gap-2'>
                  <SelectProductsVariants field={field} form={form} />
                  <ProductVariantsTable field={field} form={form} />
                  <div className='mt-2'>
                    <DisplayTotalCost field={field} />
                  </div>
                </div>
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
