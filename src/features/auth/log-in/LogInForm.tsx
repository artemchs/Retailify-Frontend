import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { logInFormSchema } from './log-in-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { Loader2, LogIn } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import AuthTitle from '../components/AuthTitle'
import { logInTitle, signUpTitle } from '../titles'
import PasswordInput from '../components/PasswordInput'
import { useState } from 'react'
import { toast } from 'sonner'
import Auth from '@/api/services/Auth'
import { AlertDestructive } from '@/components/AlertDestructive'
import { authEmailPlaceholder, authPasswordPlaceholder } from '../placeholders'

export default function LogInForm() {
  const form = useForm<z.infer<typeof logInFormSchema>>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const navigate = useNavigate()
  function onSuccess() {
    navigate({ to: '/' })
    toast('Вы успешно вошли в свой аккаунт.', {
      icon: <LogIn className='h-4 w-4' />,
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Auth.useLogIn({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof logInFormSchema>) {
    mutate(values)
  }

  return (
    <div className='flex flex-col gap-6 items-center'>
      <AuthTitle title={logInTitle} />
      <div className='w-full flex flex-col gap-4'>
        {errorMessage && errorMessage.length >= 1 && (
          <AlertDestructive text={errorMessage} />
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabelForRequiredFields text='Електронная почта' />
                  <FormControl>
                    <Input
                      type='email'
                      placeholder={authEmailPlaceholder}
                      {...field}
                    />
                  </FormControl>
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
                    <PasswordInput
                      placeholder={authPasswordPlaceholder}
                      field={field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending ? (
                <Loader2 className='h-4 w-4 mr-2 animate-spin' />
              ) : (
                <LogIn className='h-4 w-4 mr-2' />
              )}
              {logInTitle}
            </Button>
          </form>
        </Form>
      </div>
      <Button asChild variant='ghost'>
        <Link to='/auth/sign-up'>{signUpTitle}</Link>
      </Button>
    </div>
  )
}
