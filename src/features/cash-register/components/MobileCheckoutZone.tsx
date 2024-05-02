import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { TbShoppingBag } from 'react-icons/tb'
import CheckoutZone from './checkout/CheckoutZoneCashRegister'
import AddCustomBulkDiscountDialog from './checkout/AddCustomBulkDiscountDialog'
import PaymentDialog from './checkout/PaymentDialog'
import { UseFormReturn } from 'react-hook-form'
import { Dispatch } from 'react'
import { RowSelectionState } from '@tanstack/react-table'
import { cashRegisterOrderFormSchema } from '../types/cash-register-order-form-schema'
import { z } from 'zod'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  rowSelection: RowSelectionState
  setRowSelection: Dispatch<React.SetStateAction<RowSelectionState>>
  isPending: boolean
  errorMessage?: string
  onSubmit(values: z.infer<typeof cashRegisterOrderFormSchema>): void
}

export default function MobileCheckoutZone({
  form,
  rowSelection,
  setRowSelection,
  isPending,
  errorMessage,
  onSubmit,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full'>
          <TbShoppingBag className='h-4 w-4 mr-2' />
          Корзина
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Корзина</DialogTitle>
        </DialogHeader>
        <div className='flex w-full flex-col gap-4 h-full justify-between max-h-full overflow-y-auto p-4'>
          <CheckoutZone
            control={form.control}
            form={form}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
          <div className='flex flex-col gap-2'>
            <AddCustomBulkDiscountDialog form={form} />
            <PaymentDialog
              isPending={isPending}
              errorMessage={errorMessage}
              form={form}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
