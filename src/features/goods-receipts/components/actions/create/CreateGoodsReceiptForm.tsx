import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  createGoodsReceiptFormSchema,
  GoodsReceiptVariant,
} from '../../../types/create-goods-receipt-form-schema'
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
import { DatePickerWithPresets } from '@/components/ui/date-picker'
import ProductVariantsTable from '../../shared/ProductVariantsTable'
import DisplayTotalCost from '../../shared/DisplayTotalCost'
import SelectVariantsDialog from '@/features/products/variants/components/shared/selectVariants/SelectVariantsDialog'
import { RowSelectionState } from '@tanstack/react-table'
import { Variant } from '@/types/entities/Variant'
import { useNavigate } from '@tanstack/react-router'

export default function CreateGoodsReceiptForm() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const form = useForm<z.infer<typeof createGoodsReceiptFormSchema>>({
    resolver: zodResolver(createGoodsReceiptFormSchema),
    defaultValues: {
      goodsReceiptDate: new Date(),
      supplierId: '',
      warehouseId: '',
      variants: [],
      paymentOption: 'CURRENT_ACCOUNT',
    },
  })

  const navigate = useNavigate()

  async function onSuccess() {
    toast('Новая накладная прихода была успешно добавлена.', {
      icon: <PackagePlus className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })

    await navigate({
      to: '/goods-receipts',
      search: { page: 1, rowsPerPage: 20 },
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
            name='variants'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Товар' />
                <div className='flex flex-col gap-2'>
                  <SelectVariantsDialog
                    selectedRows={rowSelection}
                    setSelectedRows={setRowSelection}
                    idField='variantId'
                    selectedValues={field.value as unknown as Variant[]}
                    selectWithEditing={true}
                    setSelectedValues={(
                      type: 'variant' | 'goods-receipt-item',
                      newValues: Variant[],
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      prev: any[]
                    ) =>
                      type === 'variant'
                        ? form.setValue('variants', [
                            ...prev,
                            ...(newValues.map(
                              ({ size, id, productId, product, price }) => {
                                const existingObj = field.value.find(
                                  (obj) => obj.variantId === id
                                )

                                return {
                                  receivedQuantity:
                                    existingObj?.receivedQuantity ?? 0,
                                  supplierPrice:
                                    existingObj?.supplierPrice ?? 0,
                                  size: size,
                                  variantId: id,
                                  productId: productId ?? '',
                                  productName: product?.title ?? '',
                                  productSku: product?.sku,
                                  sellingPrice:
                                    existingObj?.sellingPrice ?? price,
                                  id,
                                  productImgId: product?.media?.[0].id,
                                }
                              }
                            ) ?? []),
                          ])
                        : form.setValue('variants', [...prev, ...newValues])
                    }
                  />
                  <ProductVariantsTable
                    variants={field.value as unknown as GoodsReceiptVariant[]}
                    setVariants={(newValues: GoodsReceiptVariant[]) =>
                      form.setValue('variants', [...newValues])
                    }
                  />
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
