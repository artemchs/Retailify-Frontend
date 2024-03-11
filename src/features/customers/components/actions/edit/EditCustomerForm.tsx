import Customers from '@/api/services/Customers'
import { editCustomerFormSchema } from '@/features/customers/types/edit-customer-form-schema'
import { Customer } from '@/types/entities/Customer'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  customerEmail,
  customerFirstName,
  customerLastName,
} from '../../shared/placeholders'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { AlertDestructive } from '@/components/AlertDestructive'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { Input } from '@/components/ui/input'
import SaveButton from '@/components/forms/SaveButton'
import AsyncInput from '@/components/forms/AsyncInput'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  data?: Customer
  id: string
  isLoading: boolean
  isError: boolean
}

export default function EditCustomerForm({
  id,
  isError,
  isLoading,
  setIsOpened,
  data,
}: Props) {
  const form = useForm<z.infer<typeof editCustomerFormSchema>>({
    resolver: zodResolver(editCustomerFormSchema),
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Клиент был успешно отредактироан.', {
      icon: <Edit className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Customers.useEdit({
    setErrorMessage,
    onSuccess,
    id,
  })

  function onSubmit(values: z.infer<typeof editCustomerFormSchema>) {
    mutate({
      body: values,
    })
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      {errorMessage && errorMessage.length >= 1 && (
        <AlertDestructive text={errorMessage} />
      )}
      <Form {...form}>
        <form className='flex flex-col gap-4'>
          <div className='flex flex-col lg:flex-row gap-4'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabelForRequiredFields text='Имя' />
                  <FormControl>
                    <AsyncInput
                      input={
                        <Input placeholder={customerFirstName} {...field} />
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
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabelForRequiredFields text='Фамилия' />
                  <FormControl>
                    <AsyncInput
                      input={
                        <Input placeholder={customerLastName} {...field} />
                      }
                      isError={isError}
                      isLoading={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Электронная почта' />
                <FormControl>
                  <AsyncInput
                    input={
                      <Input
                        type='email'
                        placeholder={customerEmail}
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
          <SaveButton isPending={isPending} form={form} onSubmit={onSubmit} />
        </form>
      </Form>
    </div>
  )
}
