import { UseFormReturn, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { cashierShiftTransactionFormSchema } from '../../../types/cashier-shift-transaction-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { ArrowDown } from 'lucide-react'
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
import SaveButton from '@/components/forms/SaveButton'
import DisplayCurrentPosBalance from '../../shared/DisplayCurrentPosBalance'

type Props = {
  posId: string
  shiftId: string
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DepositCashierShiftForm({
  posId,
  setIsOpened,
  shiftId,
}: Props) {
  const form = useForm<z.infer<typeof cashierShiftTransactionFormSchema>>({
    resolver: zodResolver(cashierShiftTransactionFormSchema),
    defaultValues: {
      amount: 0,
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Средства были успешно внесены.', {
      icon: <ArrowDown className='h-4 w-4 text-green-600' />,
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = CashierShifts.useDeposit({
    setErrorMessage,
    onSuccess,
    posId,
    id: shiftId,
  })

  function onSubmit(values: z.infer<typeof cashierShiftTransactionFormSchema>) {
    mutate({ body: values })
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      <DisplayBalanceAfterDeposit form={form} posId={posId} />
      {errorMessage && errorMessage.length >= 1 && (
        <AlertDestructive text={errorMessage} />
      )}
      <Form {...form}>
        <form className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Сумма к внесению' />
                <FormControl>
                  <Input
                    placeholder='Сумма к внесению'
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

function DisplayBalanceAfterDeposit({
  form,
  posId,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  posId: string
}) {
  const amount: number = useWatch({
    control: form.control,
    name: 'amount',
  })

  return <DisplayCurrentPosBalance posId={posId} addAmount={amount} />
}
