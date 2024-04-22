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
import { createSupplierFormSchema } from './create-supplier-form-schema'
import Suppliers from '@/api/services/Suppliers'
import {
  supplierAddress,
  supplierContactPerson,
  supplierEmail,
  supplierName,
  supplierPhone,
} from '../../../placeholders'
import PhoneNumberInput from '@/components/forms/PhoneNumberInput'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateSupplierForm({ setIsOpened }: Props) {
  const form = useForm<z.infer<typeof createSupplierFormSchema>>({
    resolver: zodResolver(createSupplierFormSchema),
    defaultValues: {
      name: '',
      address: '',
      contactPerson: '',
      email: '',
      phone: '',
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Новый поставщик был успешно добавлен.', {
      icon: <Factory className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Suppliers.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof createSupplierFormSchema>) {
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Название' />
                <FormControl>
                  <Input placeholder={supplierName} {...field} />
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
                  <Input placeholder={supplierAddress} {...field} />
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
                  <Input placeholder={supplierContactPerson} {...field} />
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
                  <Input type='email' placeholder={supplierEmail} {...field} />
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
                  <PhoneNumberInput
                    form={form}
                    field={field}
                    placeholder={supplierPhone}
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
