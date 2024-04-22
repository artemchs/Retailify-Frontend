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
import { createInventoryAdjustmentFormSchema } from '@/features/inventory-adjustments/types/create-inventory-adjustment-form-schema'
import InventoryAdjustments from '@/api/services/InventoryAdjustments'
import { DatePickerWithPresets } from '@/components/ui/date-picker'
import SelectWarehouse from '@/features/warehouses/components/shared/SelectWarehouse'
import InventoryAdjustmentReasonsCombobox from '@/features/inventory-adjustments/reasons/components/shared/InventoryAdjustmentReasonsCombobox'
import SelectVtws from '../../shared/SelectVtws'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateInventoryAdjustmentForm({ setIsOpened }: Props) {
  const form = useForm<z.infer<typeof createInventoryAdjustmentFormSchema>>({
    resolver: zodResolver(createInventoryAdjustmentFormSchema),
    defaultValues: {
      date: new Date(),
      reasonId: '',
      variants: [],
      warehouseId: '',
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Новая накладная инвентаризации была успешно добавлена.', {
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
  const { mutate, isPending } = InventoryAdjustments.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(
    values: z.infer<typeof createInventoryAdjustmentFormSchema>
  ) {
    const variants = values.variants.map(
      ({ newQuantity, oldQuantity, variantToWarehouseId }) => ({
        quantityChange: newQuantity - oldQuantity,
        variantToWarehouseId,
      })
    )

    mutate({
      body: {
        ...values,
        // @ts-expect-error abracadabra
        variants,
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
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Дата прихода' />
                <DatePickerWithPresets
                  fieldName='date'
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
              name='reasonId'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabelForRequiredFields text='Причина' />
                  <InventoryAdjustmentReasonsCombobox
                    form={form}
                    field={field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='variants'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabelForRequiredFields text='Товар' />
                <SelectVtws field={field} form={form} control={form.control} />
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
