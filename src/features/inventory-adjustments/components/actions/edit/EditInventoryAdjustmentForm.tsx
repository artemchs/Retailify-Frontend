import { AlertDestructive } from '@/components/AlertDestructive'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import SaveButton from '@/components/forms/SaveButton'
import InventoryAdjustments from '@/api/services/InventoryAdjustments'
import { DatePickerWithPresets } from '@/components/ui/date-picker'
import SelectWarehouse from '@/features/warehouses/components/shared/SelectWarehouse'
import InventoryAdjustmentReasonsCombobox from '@/features/inventory-adjustments/reasons/components/shared/InventoryAdjustmentReasonsCombobox'
import SelectVtws from '../../shared/SelectVtws'
import { FullInventoryAdjustment } from '@/types/entities/InventoryAdjustment'
import { editInventoryAdjustmentFormSchema } from '@/features/inventory-adjustments/types/edit-inventory-adjustment-form-schema'
import AsyncInput from '@/components/forms/AsyncInput'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  id: string
  data?: FullInventoryAdjustment
  isLoading: boolean
  isError: boolean
}

export default function EditInventoryAdjustmentForm({
  setIsOpened,
  isError,
  isLoading,
  data,
  id,
}: Props) {
  const form = useForm<z.infer<typeof editInventoryAdjustmentFormSchema>>({
    resolver: zodResolver(editInventoryAdjustmentFormSchema),
    defaultValues: {
      date: data?.date ? new Date(data.date) : new Date(),
      reasonId: data?.reasonId ?? undefined,
      variants: data?.variants.map((v) => ({
        productTitle: v.variantToWarehouse?.variant?.product?.title,
        size: v.variantToWarehouse?.variant?.size,
        variantId: v.variantToWarehouse?.variant?.id,
        variantToWarehouseId: v.variantToWarehouseId ?? undefined,
        quantityChange: v.quantityChange,
        oldQuantity:
          (v.variantToWarehouse?.warehouseQuantity ?? 0) - v.quantityChange,
        newQuantity:
          (v.variantToWarehouse?.warehouseQuantity ?? 0) + v.quantityChange,
      })),
      warehouseId: data?.warehouseId ?? undefined,
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Накладная инвентаризации была успешно отредактирована.', {
      icon: <Edit className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = InventoryAdjustments.useEdit({
    setErrorMessage,
    onSuccess,
    id,
  })

  function onSubmit(values: z.infer<typeof editInventoryAdjustmentFormSchema>) {
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
        <form className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Дата прихода' />
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
          <div className='flex flex-col lg:flex-row gap-4'>
            <FormField
              control={form.control}
              name='warehouseId'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabelForRequiredFields text='Склад' />
                  <AsyncInput
                    input={<SelectWarehouse form={form} field={field} />}
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
                      <InventoryAdjustmentReasonsCombobox
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
          </div>
          <FormField
            control={form.control}
            name='variants'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabelForRequiredFields text='Товар' />
                <AsyncInput
                  input={
                    <SelectVtws
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
