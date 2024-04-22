import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createCashierShiftFormSchema } from '../../../types/create-cashier-shift-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import CashierShifts from '@/api/services/CashierShifts'
import { AlertDestructive } from '@/components/AlertDestructive'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { Input } from '@/components/ui/input'
import { cashierShiftStartingCashBalance } from '../../shared/placeholders'
import SaveButton from '@/components/forms/SaveButton'

type Props = {
  posId: string
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  setShiftId?: (id: string) => void
}

export default function CreateCashierShiftForm({
  setIsOpened,
  posId,
  setShiftId,
}: Props) {
  const form = useForm<z.infer<typeof createCashierShiftFormSchema>>({
    resolver: zodResolver(createCashierShiftFormSchema),
    defaultValues: {
      startingCashBalance: 0,
    },
  })

  function onSuccess(data?: string) {
    setIsOpened(false)
    toast('Новая смена кассира была открыта.', {
      icon: <Plus className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })

    if (setShiftId && data) {
      setShiftId(data)
    }
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = CashierShifts.useCreate({
    setErrorMessage,
    onSuccess,
    posId,
  })

  function onSubmit(values: z.infer<typeof createCashierShiftFormSchema>) {
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
            name='startingCashBalance'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Начальная сумма к внесению' />
                <FormControl>
                  <Input
                    placeholder={cashierShiftStartingCashBalance}
                    type='number'
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
