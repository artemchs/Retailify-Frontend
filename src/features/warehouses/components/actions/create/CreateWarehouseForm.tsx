import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Warehouse } from 'lucide-react'
import { useState } from 'react'
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
import { createWarehouseFormSchema } from './create-warehouse-form-schema'
import Warehouses from '@/api/services/Warehouses'
import {
  warehouseAddress,
  warehouseName,
} from '@/features/warehouses/placeholders'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateWarehouseForm({ setIsOpened }: Props) {
  const form = useForm<z.infer<typeof createWarehouseFormSchema>>({
    resolver: zodResolver(createWarehouseFormSchema),
    defaultValues: {
      name: '',
      address: '',
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Новый склад был успешно добавлен.', {
      icon: <Warehouse className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Warehouses.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof createWarehouseFormSchema>) {
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Название' />
                <FormControl>
                  <Input placeholder={warehouseName} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Адрес' />
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
