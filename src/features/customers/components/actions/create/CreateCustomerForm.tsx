import Customers from '@/api/services/Customers'
import { AlertDestructive } from '@/components/AlertDestructive'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createCustomerFormSchema } from '@/features/customers/types/create-customer-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  customerEmail,
  customerFirstName,
  customerLastName,
  customerPhoneNumber,
} from '../../shared/placeholders'
import SaveButton from '@/components/forms/SaveButton'
import PhoneNumberInput from '@/components/forms/PhoneNumberInput'
import { Label } from '@/components/ui/label'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateCustomerForm({ setIsOpened }: Props) {
  const form = useForm<z.infer<typeof createCustomerFormSchema>>({
    resolver: zodResolver(createCustomerFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Новый клиент был добавлен.', {
      icon: <Plus className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Customers.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof createCustomerFormSchema>) {
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
                    <Input placeholder={customerFirstName} {...field} />
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
                    <Input placeholder={customerLastName} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Номер телефона' />
                <FormControl>
                  <PhoneNumberInput
                    field={field}
                    form={form}
                    fieldName='phoneNumber'
                    placeholder={customerPhoneNumber}
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
                <Label>Электронная почта:</Label>
                <FormControl>
                  <Input type='email' placeholder={customerEmail} {...field} />
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
