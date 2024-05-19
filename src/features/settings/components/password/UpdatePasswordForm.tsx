import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import PasswordInput from '@/features/auth/components/PasswordInput'
import { toast } from 'sonner'
import { updatePasswordFormSchema } from './update-password-form-schema'
import { useState } from 'react'
import Users from '@/api/services/Users'
import SaveButton from '@/components/forms/SaveButton'
import { AlertDestructive } from '@/components/AlertDestructive'
import { useNavigate } from '@tanstack/react-router'

const UpdatePasswordForm = () => {
    return (
        <div className='flex flex-col gap-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Новый пароль</CardTitle>
                    <CardDescription>
                        После успешного изменения пароля вы будете перенесены на
                        страницу авторизации.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PasswordForm />
                </CardContent>
            </Card>
        </div>
    )
}

const PasswordForm = () => {
    const form = useForm<z.infer<typeof updatePasswordFormSchema>>({
        resolver: zodResolver(updatePasswordFormSchema),
        defaultValues: {
            password: '',
            passwordConfirm: '',
        },
    })

    const navigate = useNavigate()

    function onSuccess() {
        toast('Пароль успешно изменен.', {
            cancel: {
                label: 'Ок',
                onClick() {
                    toast.dismiss
                },
            },
        })
        navigate({ to: '/auth/log-in' })
    }

    const [errorMessage, setErrorMessage] = useState('')
    const { mutate, isPending } = Users.useUpdatePassword({
        setErrorMessage,
        onSuccess,
    })

    function onSubmit(values: z.infer<typeof updatePasswordFormSchema>) {
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
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelForRequiredFields text='Новый пароль' />
                                <FormControl>
                                    <PasswordInput
                                        placeholder='Ваш новый пароль'
                                        field={field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='passwordConfirm'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelForRequiredFields text='Подтвердите новый пароль' />
                                <FormControl>
                                    <PasswordInput
                                        placeholder='Подтвердите ваш новый пароль'
                                        field={field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SaveButton
                        isPending={isPending}
                        form={form}
                        onSubmit={onSubmit}
                    />
                </form>
            </Form>
        </div>
    )
}

export default UpdatePasswordForm
