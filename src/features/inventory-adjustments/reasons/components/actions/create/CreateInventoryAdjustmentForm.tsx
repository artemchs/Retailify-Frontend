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
import { zodResolver } from '@hookform/resolvers/zod'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { Input } from '@/components/ui/input'
import SaveButton from '@/components/forms/SaveButton'
import { inventoryAdjustmentReasonName } from '../../../placeholders'
import { createInventoryAdjustmentReasonFormSchema } from '../../../types/create-inventory-adjustment-reason-form-schema'
import InventoryAdjustments from '@/api/services/InventoryAdjustments'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateInventoryAdjustmentReasonForm({
  setIsOpened,
}: Props) {
  const form = useForm<
    z.infer<typeof createInventoryAdjustmentReasonFormSchema>
  >({
    resolver: zodResolver(createInventoryAdjustmentReasonFormSchema),
    defaultValues: {
      name: '',
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Новая причина инвентаризации добавлена.', {
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = InventoryAdjustments.useCreateReason({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(
    values: z.infer<typeof createInventoryAdjustmentReasonFormSchema>
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
                  <Input
                    placeholder={inventoryAdjustmentReasonName}
                    {...field}
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
