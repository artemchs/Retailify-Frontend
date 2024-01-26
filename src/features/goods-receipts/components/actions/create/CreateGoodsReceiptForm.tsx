import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createGoodsReceiptFormSchema } from './create-goods-receipt-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { PackagePlus } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'
import GoodsReceipts from '@/api/services/GoodsReceipts'
import { AlertDestructive } from '@/components/AlertDestructive'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateGoodsReceiptForm({ setIsOpened }: Props) {
  const form = useForm<z.infer<typeof createGoodsReceiptFormSchema>>({
    resolver: zodResolver(createGoodsReceiptFormSchema),
    defaultValues: {
      goodsReceiptDate: new Date(),
      paymentOption: 'PRIVATE_FUNDS',
      paymentTerm: 'PAYMENT_IN_ADVANCE',
      supplierId: '',
      warehouseId: '',
      variants: [],
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Новая накладная прихода была успешно добавлена.', {
      icon: <PackagePlus className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = GoodsReceipts.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof createGoodsReceiptFormSchema>) {
    mutate({ body: values })
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
            name='supplierId'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Поставщик' />
                <FormControl>
                  <Input placeholder={warehouseName} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='warehouseId'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Склад' />
                <FormControl>
                  <Input placeholder={warehouseAddress} {...field} />
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
