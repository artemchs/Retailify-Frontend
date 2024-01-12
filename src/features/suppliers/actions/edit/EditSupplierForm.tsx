import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Factory } from 'lucide-react'
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
import {
  supplierAddress,
  supplierContactPerson,
  supplierEmail,
  supplierName,
  supplierPhone,
} from '../../placeholders'
import { Supplier } from '@/types/entities/Supplier'
import { editSupplierFormSchema } from './edit-supplier-form-schema'
import Suppliers from '@/api/services/Suppliers'
import PhoneNumberInput from '@/components/forms/PhoneNumberInput'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  supplier?: Supplier
  supplierId: string
  isLoading: boolean
  isError: boolean
}

export default function EditSupplierForm({
  setIsOpened,
  supplier,
  isError,
  isLoading,
  supplierId,
}: Props) {
  const form = useForm<z.infer<typeof editSupplierFormSchema>>({
    resolver: zodResolver(editSupplierFormSchema),
    defaultValues: {
      name: supplier?.name,
      contactPerson: supplier?.contactPerson,
      email: supplier?.email,
      phone: supplier?.phone,
      address: supplier?.address,
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Поставщик был успешно отредактироан.', {
      icon: <Factory className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Suppliers.useEdit({
    setErrorMessage,
    onSuccess,
    id: supplierId,
  })

  function onSubmit(values: z.infer<typeof editSupplierFormSchema>) {
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
                    input={<Input placeholder={supplierName} {...field} />}
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
                    input={<Input placeholder={supplierAddress} {...field} />}
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
            name='contactPerson'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Контактное лицо' />
                <FormControl>
                  <AsyncInput
                    input={
                      <Input placeholder={supplierContactPerson} {...field} />
                    }
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
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Електронная почта' />
                <FormControl>
                  <AsyncInput
                    input={
                      <Input
                        type='email'
                        placeholder={supplierEmail}
                        {...field}
                      />
                    }
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
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Номер телефона' />
                <FormControl>
                  <AsyncInput
                    input={
                      <PhoneNumberInput
                        form={form}
                        field={field}
                        placeholder={supplierPhone}
                      />
                    }
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
