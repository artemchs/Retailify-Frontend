import InventoryTransfers from '@/api/services/InventoryTransfers'
import { AlertDestructive } from '@/components/AlertDestructive'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { DatePickerWithPresets } from '@/components/ui/date-picker'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import InventoryTransferReasonsCombobox from '@/features/inventory-transfers/reasons/components/shared/InventoryTransferReasonsCombobox'
import { editInventoryTransferFormSchema } from '@/features/inventory-transfers/types/edit-inventory-transfer-form-schema'
import SelectWarehouse from '@/features/warehouses/components/shared/SelectWarehouse'
import { FullInventoryTransfer } from '@/types/entities/InventoryTransfer'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import SelectTransferItems from '../../shared/SelectTransferItems'
import SaveButton from '@/components/forms/SaveButton'
import AsyncInput from '@/components/forms/AsyncInput'
import { useEffect, useState } from 'react'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  id: string
  data?: FullInventoryTransfer
  isLoading: boolean
  isError: boolean
}

export default function EditInventoryTransferForm({
  id,
  isError,
  isLoading,
  setIsOpened,
  data,
}: Props) {
  const form = useForm<z.infer<typeof editInventoryTransferFormSchema>>({
    resolver: zodResolver(editInventoryTransferFormSchema),
    defaultValues: {
      date: data?.date ? new Date(data.date) : new Date(),
      reasonId: data?.reasonId ?? undefined,
      sourceWarehouseId: data?.sourceWarehouseId ?? undefined,
      destinationWarehouseId: data?.destinationWarehouseId ?? undefined,
      transferItems: data?.transferItems.map((item) => ({
        quantity: item.quantity,
        variantId: item.variantId ?? '',
        size: item.variant?.size,
        title: item.variant?.product?.title,
        warehouseQuantity:
          item.variant?.warehouseStockEntries[0].warehouseQuantity,
      })),
    },
  })

  useEffect(() => {
    if (data) {
      form.setValue(
        'transferItems',
        data.transferItems.map((item) => ({
          quantity: item.quantity,
          variantId: item.variantId ?? '',
          size: item.variant?.size,
          title: item.variant?.product?.title,
          warehouseQuantity:
            (item.variant?.warehouseStockEntries[0].warehouseQuantity ?? 0) +
            (data.isArchived ? 0 : item.quantity),
        }))
      )
    }
  }, [data, form])

  function onSuccess() {
    setIsOpened(false)
    toast('Накладная перемещения была успешно отредактирована.', {
      icon: <Edit className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = InventoryTransfers.useEdit({
    setErrorMessage,
    onSuccess,
    id,
  })

  function onSubmit(values: z.infer<typeof editInventoryTransferFormSchema>) {
    const transferItems = values.transferItems.map(
      ({ quantity, variantId }) => ({ quantity, variantId })
    )
    mutate({ body: { ...values, transferItems } })
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
            name='date'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabelForRequiredFields text='Дата перемещения' />
                <AsyncInput
                  input={
                    <DatePickerWithPresets
                      fieldName='date'
                      field={field}
                      form={form}
                    />
                  }
                  isError={isError}
                  isLoading={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='reasonId'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabelForRequiredFields text='Причина' />
                <AsyncInput
                  input={
                    <InventoryTransferReasonsCombobox
                      form={form}
                      field={field}
                    />
                  }
                  isError={isError}
                  isLoading={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col lg:flex-row gap-4'>
            <FormField
              control={form.control}
              name='sourceWarehouseId'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabelForRequiredFields text='Со склада' />
                  <AsyncInput
                    input={
                      <SelectWarehouse
                        form={form}
                        field={field}
                        fieldName='sourceWarehouseId'
                      />
                    }
                    isError={isError}
                    isLoading={isLoading}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='destinationWarehouseId'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabelForRequiredFields text='На склад' />
                  <AsyncInput
                    input={
                      <SelectWarehouse
                        form={form}
                        field={field}
                        fieldName='destinationWarehouseId'
                      />
                    }
                    isError={isError}
                    isLoading={isLoading}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='transferItems'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabelForRequiredFields text='Товар' />
                <AsyncInput
                  input={
                    <SelectTransferItems
                      field={field}
                      form={form}
                      control={form.control}
                    />
                  }
                  isError={isError}
                  isLoading={isLoading}
                />
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
