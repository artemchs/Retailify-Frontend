import { AlertDestructive } from '@/components/AlertDestructive'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import SaveButton from '@/components/forms/SaveButton'
import { DatePickerWithPresets } from '@/components/ui/date-picker'
import SelectWarehouse from '@/features/warehouses/components/shared/SelectWarehouse'
import { createInventoryTransferFormSchema } from '@/features/inventory-transfers/types/create-inventory-transfer-form-schema'
import InventoryTransfers from '@/api/services/InventoryTransfers'
import InventoryTransferReasonsCombobox from '@/features/inventory-transfers/reasons/components/shared/InventoryTransferReasonsCombobox'
import SelectTransferItems from '../../shared/SelectTransferItems'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateInventoryTransferForm({ setIsOpened }: Props) {
  const form = useForm<z.infer<typeof createInventoryTransferFormSchema>>({
    resolver: zodResolver(createInventoryTransferFormSchema),
    defaultValues: {
      date: new Date(),
      reasonId: '',
      transferItems: [],
      destinationWarehouseId: '',
      sourceWarehouseId: '',
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Новая накладная перемещения товара была успешно добавлена.', {
      icon: <Plus className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = InventoryTransfers.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof createInventoryTransferFormSchema>) {
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
        <form
          className='flex flex-col gap-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabelForRequiredFields text='Дата перемещения' />
                <DatePickerWithPresets
                  fieldName='date'
                  field={field}
                  form={form}
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
                <InventoryTransferReasonsCombobox form={form} field={field} />
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
                  <SelectWarehouse
                    form={form}
                    field={field}
                    fieldName='sourceWarehouseId'
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
                  <SelectWarehouse
                    form={form}
                    field={field}
                    fieldName='destinationWarehouseId'
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
                <SelectTransferItems
                  field={field}
                  form={form}
                  control={form.control}
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
