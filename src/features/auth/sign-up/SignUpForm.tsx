import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { User } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { signUpFormSchema } from './sign-up-form-schema'
import AuthTitle from '../components/AuthTitle'
import {
  fullNamePlaceholder,
  logInTitle,
  signUpTitle,
  usernamePlaceholder,
} from '../variables'
import PasswordInput from '../components/PasswordInput'

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullName: '',
      password: '',
      username: '',
    },
  })

  function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    console.log(values)
  }

  return (
    <div className='flex flex-col gap-6 items-center'>
      <AuthTitle title={signUpTitle} />
      <div className='w-full'>
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
                    <Input placeholder={fullNamePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabelForRequiredFields text='Имя пользователя' />
                  <FormControl>
                    <Input placeholder={usernamePlaceholder} {...field} />
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
                  <FormDescription>
                    Придумайте пароль, который будет состоять как минимум из 8
                    символов, включая цифры, буквы и специальные символы.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='mt-4'>
              <User className='h-4 w-4 mr-2' />
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
