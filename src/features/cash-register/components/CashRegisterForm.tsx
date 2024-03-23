import { RowSelectionState } from '@tanstack/react-table'
import { useState } from 'react'
import ProductsListCashRegister from './products-table/ProductsListCashRegister'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cashRegisterOrderFormSchema } from '../types/cash-register-order-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import CheckoutZone from './checkout/CheckoutZoneCashRegister'
import PaymentDialog from './checkout/PaymentDialog'
import AddCustomBulkDiscountDialog from './checkout/AddCustomBulkDiscountDialog'
import Orders from '@/api/services/Orders'
import { toast } from 'sonner'
import { Check } from 'lucide-react'

export default function CashRegisterForm({
  posId,
  shiftId,
}: {
  posId: string
  shiftId: string
}) {
  const form = useForm<z.infer<typeof cashRegisterOrderFormSchema>>({
    resolver: zodResolver(cashRegisterOrderFormSchema),
    defaultValues: {
      customerId: '',
      items: [],
      paymentMethod: 'CASH',
    },
  })

  function onSuccess() {
    toast('Продажа успешна.', {
      icon: <Check className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Orders.useCreate({
    setErrorMessage,
    onSuccess,
    shiftId,
  })

  function onSubmit(values: z.infer<typeof cashRegisterOrderFormSchema>) {
    mutate({ body: { ...values, posId } })
  }
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  return (
    <div className='cashier-content-max-h flex flex-grow'>
      <Form {...form}>
        <form className='max-h-full flex flex-grow'>
          <div className='flex w-full h-full'>
            <div className='w-full h-full'>
              <FormField
                control={form.control}
                name='items'
                render={({ field }) => (
                  <FormItem className='flex h-full'>
                    <FormControl>
                      <ProductsListCashRegister
                        field={field}
                        form={form}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className='w-[65%] max-h-full overflow-y-auto border-l border-input'>
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
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
