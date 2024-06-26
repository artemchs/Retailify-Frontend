import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit } from 'lucide-react'
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
import { GoodsReceipt } from '@/types/entities/GoodsReceipt'
import { editGoodsReceiptFormSchema } from '@/features/goods-receipts/types/edit-goods-receipt-form-schema'
import SelectVariantsDialog from '@/features/products/variants/components/shared/selectVariants/SelectVariantsDialog'
import { RowSelectionState } from '@tanstack/react-table'
import { Variant } from '@/types/entities/Variant'
import arrayToIdObject from '@/utils/arrayToIdObject'
import { useNavigate } from '@tanstack/react-router'
import { GoodsReceiptVariant } from '@/features/goods-receipts/types/create-goods-receipt-form-schema.ts'
import GoodsReceiptTotalCost from '../../shared/GoodsReceiptTotalCost'

type Props = {
    goodsReceiptId: string
    goodsReceipt?: GoodsReceipt
}

export default function EditGoodsReceiptForm({
    goodsReceiptId,
    goodsReceipt,
}: Props) {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>(
        goodsReceipt?.productVariants
            ? arrayToIdObject(
                  goodsReceipt.productVariants.map(
                      ({ variant }) => variant
                  ) as unknown as {
                      id: string
                  }[]
              )
            : {}
    )
    const form = useForm<z.infer<typeof editGoodsReceiptFormSchema>>({
        resolver: zodResolver(editGoodsReceiptFormSchema),
        defaultValues: {
            goodsReceiptDate: goodsReceipt?.goodsReceiptDate
                ? new Date(goodsReceipt?.goodsReceiptDate)
                : new Date(),
            supplierId: goodsReceipt?.supplierId ?? '',
            warehouseId: goodsReceipt?.warehouseId ?? '',
            amountPaid: goodsReceipt?.supplierInvoice?.amountPaid
                ? parseFloat(goodsReceipt.supplierInvoice.amountPaid)
                : 0,
            variants:
                goodsReceipt?.productVariants?.map(
                    ({ receivedQuantity, supplierPrice, variant }) => ({
                        receivedQuantity,
                        supplierPrice: parseFloat(supplierPrice),
                        size: variant?.size,
                        variantId: variant?.id,
                        productId: variant?.product?.id,
                        productName: variant?.product?.title,
                        sellingPrice: variant?.price
                            ? parseFloat(variant.price)
                            : 0,
                        productSku: variant?.product?.sku,
                        productImgId: variant?.product?.media?.[0].id,
                    })
                ) ?? [],
            paymentOption:
                goodsReceipt?.supplierInvoice?.paymentOption ??
                'CURRENT_ACCOUNT',
        },
    })

    const navigate = useNavigate()

    function onSuccess() {
        toast('Накладная прихода была успешно отредактирована.', {
            icon: <Edit className='h-4 w-4' />,
            cancel: {
                label: 'Ок',
                onClick() {
                    toast.dismiss
                },
            },
        })

        navigate({
            to: '/goods-receipts',
            search: { page: 1, rowsPerPage: 20 },
        })
    }

    const [errorMessage, setErrorMessage] = useState('')
    const { mutate, isPending } = GoodsReceipts.useEdit({
        setErrorMessage,
        onSuccess,
        id: goodsReceiptId,
    })

    function onSubmit(values: z.infer<typeof editGoodsReceiptFormSchema>) {
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
                        name='variants'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelForRequiredFields text='Товар' />
                                <div className='flex flex-col gap-2'>
                                    <SelectVariantsDialog
                                        idField='variantId'
                                        selectedRows={rowSelection}
                                        setSelectedRows={setRowSelection}
                                        selectedValues={
                                            field.value as unknown as Variant[]
                                        }
                                        selectWithEditing={true}
                                        setSelectedValues={(
                                            type:
                                                | 'variant'
                                                | 'goods-receipt-item',
                                            newValues: Variant[],
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            prev: any[]
                                        ) =>
                                            type === 'variant'
                                                ? form.setValue('variants', [
                                                      ...prev,
                                                      ...(newValues.map(
                                                          ({
                                                              size,
                                                              id,
                                                              productId,
                                                              product,
                                                              price,
                                                          }) => {
                                                              const existingObj =
                                                                  field.value.find(
                                                                      (obj) =>
                                                                          obj.variantId ===
                                                                          id
                                                                  )

                                                              return {
                                                                  receivedQuantity:
                                                                      existingObj?.receivedQuantity ??
                                                                      0,
                                                                  supplierPrice:
                                                                      existingObj?.supplierPrice ??
                                                                      0,
                                                                  size: size,
                                                                  variantId: id,
                                                                  productId:
                                                                      productId ??
                                                                      '',
                                                                  productName:
                                                                      product?.title ??
                                                                      '',
                                                                  productSku:
                                                                      product?.sku,
                                                                  sellingPrice:
                                                                      existingObj?.sellingPrice ??
                                                                      price,
                                                                  productImgId:
                                                                      product
                                                                          ?.media?.[0]
                                                                          .id,
                                                              }
                                                          }
                                                      ) ?? []),
                                                  ])
                                                : form.setValue('variants', [
                                                      ...prev,
                                                      ...newValues,
                                                  ])
                                        }
                                    />
                                    <ProductVariantsTable
                                        variants={
                                            field.value as unknown as GoodsReceiptVariant[]
                                        }
                                        setVariants={(
                                            newValues: GoodsReceiptVariant[]
                                        ) =>
                                            form.setValue('variants', newValues)
                                        }
                                    />
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-lg font-medium'>
                            Финансовый итог:
                        </h3>
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
                        <GoodsReceiptTotalCost form={form} />
                    </div>
                    <SaveButton
                        isPending={isPending}
                        form={form}
                        onSubmit={onSubmit}
                    />
                </form>
            </Form>
        </div>
    )
}
