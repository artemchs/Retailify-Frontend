import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createEmployeeFormSchema } from './create-employee-form-schema'
import { toast } from 'sonner'
import { User } from 'lucide-react'
import { useState } from 'react'
import Employees from '@/api/services/Employees'
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
import { emailPlaceholder, fullNamePlaceholder } from '@/features/placeholders'
import PasswordInput from '@/features/auth/components/PasswordInput'
import SaveButton from '@/components/forms/SaveButton'
import SelectRole from './SelectRole'
import { queryClient } from '@/lib/query-client/tanstack-query-client'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateEmployeeForm({ setIsOpened }: Props) {
  const form = useForm<z.infer<typeof createEmployeeFormSchema>>({
    resolver: zodResolver(createEmployeeFormSchema),
    defaultValues: {
      fullName: '',
      password: '',
      email: '',
      role: 'CASHIER',
    },
  })

  function onSuccess() {
    queryClient.invalidateQueries({
      queryKey: ['employees'],
    })
    setIsOpened(false)
    toast('Новый сотрудник был успешно добавлен.', {
      icon: <User className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Employees.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof createEmployeeFormSchema>) {
    mutate(values)
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
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Полное имя' />
                <FormControl>
                  <Input placeholder={fullNamePlaceholder} {...field} />
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
                  <Input
                    type='email'
                    placeholder={emailPlaceholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Роль' />
                <SelectRole field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Пароль' />
                <FormControl>
                  <PasswordInput field={field} />
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
