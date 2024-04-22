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
import { createInventoryTransferReasonFormSchema } from '../../../types/create-inventory-transfer-reason-form-schema'
import InventoryTransfers from '@/api/services/InventoryTransfers'
import { inventoryTransferReasonName } from '../../../placeholders'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateInventoryTransferReasonForm({
  setIsOpened,
}: Props) {
  const form = useForm<z.infer<typeof createInventoryTransferReasonFormSchema>>(
    {
      resolver: zodResolver(createInventoryTransferReasonFormSchema),
      defaultValues: {
        name: '',
      },
    }
  )

  function onSuccess() {
    setIsOpened(false)
    toast('Новая причина перемещения добавлена.', {
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = InventoryTransfers.useCreateReason({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(
    values: z.infer<typeof createInventoryTransferReasonFormSchema>
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
        <form
          className='flex flex-col gap-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Название' />
                <FormControl>
                  <Input placeholder={inventoryTransferReasonName} {...field} />
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
