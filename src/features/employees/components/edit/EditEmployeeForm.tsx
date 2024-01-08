import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { User } from 'lucide-react'
import { useState } from 'react'
import Employees, { EmployeesFindOne } from '@/api/services/Employees'
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
import SaveButton from '@/components/forms/SaveButton'
import SelectRole from '../SelectRole'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { editEmployeeFormSchema } from './edit-employee-form-schema'
import AsyncInput from '@/components/forms/AsyncInput'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  user?: EmployeesFindOne
  isLoading: boolean
  isError: boolean
}

export default function EditEmployeeForm({
  setIsOpened,
  user,
  isError,
  isLoading,
}: Props) {
  const form = useForm<z.infer<typeof editEmployeeFormSchema>>({
    resolver: zodResolver(editEmployeeFormSchema),
    defaultValues: {
      fullName: user?.fullName,
      email: user?.email,
      role: user?.role,
    },
  })

  function onSuccess() {
    queryClient.invalidateQueries({
      queryKey: ['employee', { id: user?.id }],
    })
    queryClient.invalidateQueries({
      queryKey: ['employees'],
    })
    setIsOpened(false)
    toast('Сотрудник был успешно отредактироан.', {
      icon: <User className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Employees.useEdit({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof editEmployeeFormSchema>) {
    if (user?.id) {
      mutate({ ...values, id: user.id })
    }
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
                  <AsyncInput
                    input={
                      <Input placeholder={fullNamePlaceholder} {...field} />
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
                        placeholder={emailPlaceholder}
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
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Роль' />
                <AsyncInput
                  input={<SelectRole field={field} />}
                  isError={isError}
                  isLoading={isLoading}
                />
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
