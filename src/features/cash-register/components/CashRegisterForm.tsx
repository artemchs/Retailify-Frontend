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

export default function CashRegisterForm() {
  const form = useForm<z.infer<typeof cashRegisterOrderFormSchema>>({
    resolver: zodResolver(cashRegisterOrderFormSchema),
    defaultValues: {
      customerId: '',
      items: [],
      paymentMethod: 'CASH',
    },
  })

  // function onSubmit(values: z.infer<typeof cashRegisterOrderFormSchema>) {
  //   console.log({ values })
  // }
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
                  <PaymentDialog form={form} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
