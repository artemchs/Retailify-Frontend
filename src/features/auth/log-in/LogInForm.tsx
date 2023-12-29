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
import { LogIn } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export default function LogInForm() {
  const form = useForm<z.infer<typeof logInFormSchema>>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      password: '',
      username: '',
    },
  })

  function onSubmit(values: z.infer<typeof logInFormSchema>) {
    console.log(values)
  }

  return (
    <div className='flex flex-col gap-6 items-center'>
      <div className='w-full'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabelForRequiredFields text='Имя пользователя' />
                  <FormControl>
                    <Input placeholder='Пользователь 1' {...field} />
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
                    <Input placeholder='••••••••••••••••' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              <LogIn className='h-4 w-4 mr-2' />
              Войти в аккаунт
            </Button>
          </form>
        </Form>
      </div>
      <Button asChild variant='ghost'>
        <Link to='/'>Создать новый аккаунт</Link>
      </Button>
    </div>
  )
}
