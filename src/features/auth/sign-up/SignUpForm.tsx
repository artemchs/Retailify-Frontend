import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { Loader2, User } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { signUpFormSchema } from './sign-up-form-schema'
import AuthTitle from '../components/AuthTitle'
import { logInTitle, signUpTitle } from '../titles'
import PasswordInput from '../components/PasswordInput'
import Auth from '@/api/services/Auth'
import { useState } from 'react'
import { AlertDestructive } from '@/components/AlertDestructive'
import { toast } from 'sonner'
import { authEmailPlaceholder, authFullNamePlaceholder } from '../placeholders'

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullName: '',
      password: '',
      email: '',
    },
  })

  const navigate = useNavigate()
  function onSuccess() {
    navigate({ to: '/' })
    toast('Новый аккаунт был успешно создан.', {
      icon: <User className='h-4 w-4' />,
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Auth.useSignUp({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    mutate(values)
  }

  return (
    <div className='flex flex-col gap-6 items-center'>
      <AuthTitle title={signUpTitle} />
      <div className='w-full flex flex-col gap-4'>
        {errorMessage && errorMessage.length >= 1 && (
          <AlertDestructive text={errorMessage} />
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem>
                  <FormLabelForRequiredFields text='Полное имя' />
                  <FormControl>
                    <Input placeholder={authFullNamePlaceholder} {...field} />
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
                    <PasswordInput field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='mt-4' disabled={isPending}>
              {isPending ? (
                <Loader2 className='h-4 w-4 mr-2 animate-spin' />
              ) : (
                <User className='h-4 w-4 mr-2' />
              )}
              {signUpTitle}
            </Button>
          </form>
        </Form>
      </div>
      <Button asChild variant='ghost'>
        <Link to='/auth/log-in'>{logInTitle}</Link>
      </Button>
    </div>
  )
}
