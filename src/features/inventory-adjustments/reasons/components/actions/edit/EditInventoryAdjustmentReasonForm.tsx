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
import { InventoryAdjustmentReason } from '@/types/entities/InventoryAdjustment'
import { editInventoryAdjustmentReasonFormSchema } from '../../../types/edit-inventory-adjustment-reason-form-schema'
import InventoryAdjustments from '@/api/services/InventoryAdjustments'
import { inventoryAdjustmentReasonName } from '../../../placeholders'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  reason?: InventoryAdjustmentReason
  id: string
  isLoading: boolean
  isError: boolean
}

export default function EditInventoryAdjustmentReasonForm({
  setIsOpened,
  id,
  isError,
  isLoading,
  reason,
}: Props) {
  const form = useForm<z.infer<typeof editInventoryAdjustmentReasonFormSchema>>(
    {
      resolver: zodResolver(editInventoryAdjustmentReasonFormSchema),
      defaultValues: {
        name: reason?.name,
      },
    }
  )

  function defaultOnSuccess() {
    setIsOpened(false)
    toast('Накладная инвентаризации отредактирована.', {
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = InventoryAdjustments.useEditReason({
    setErrorMessage,
    onSuccess: defaultOnSuccess,
    id,
  })

  function onSubmit(
    values: z.infer<typeof editInventoryAdjustmentReasonFormSchema>
  ) {
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
        <form className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Название' />
                <FormControl>
                  <AsyncInput
                    input={
                      <Input
                        placeholder={inventoryAdjustmentReasonName}
                        {...field}
                      />
                    }
                    isError={isError}
                    isLoading={isLoading}
                  />
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
