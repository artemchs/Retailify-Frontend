import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
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
import AsyncInput from '@/components/forms/AsyncInput'
import { Warehouse } from '@/types/entities/Warehouse'
import { editWarehouseFormSchema } from './edit-warehouse-form-schema'
import Warehouses from '@/api/services/Warehouses'
import { WarehouseIcon } from 'lucide-react'
import {
  warehouseAddress,
  warehouseName,
} from '@/features/warehouses/placeholders'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  warehouse?: Warehouse
  warehouseId: string
  isLoading: boolean
  isError: boolean
}

export default function EditWarehouseForm({
  setIsOpened,
  warehouse,
  isError,
  isLoading,
  warehouseId,
}: Props) {
  const form = useForm<z.infer<typeof editWarehouseFormSchema>>({
    resolver: zodResolver(editWarehouseFormSchema),
    defaultValues: {
      name: warehouse?.name,
      address: warehouse?.address,
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Склад был успешно отредактироан.', {
      icon: <WarehouseIcon className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Warehouses.useEdit({
    setErrorMessage,
    onSuccess,
    id: warehouseId,
  })

  function onSubmit(values: z.infer<typeof editWarehouseFormSchema>) {
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
                  <AsyncInput
                    input={<Input placeholder={warehouseName} {...field} />}
                    isError={isError}
                    isLoading={isLoading}
                  />
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
                  <AsyncInput
                    input={<Input placeholder={warehouseAddress} {...field} />}
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
