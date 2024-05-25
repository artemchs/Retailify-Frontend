import SaveButton from '@/components/forms/SaveButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
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
import AsyncInput from '@/components/forms/AsyncInput'
import { customOperationName } from '../../shared/placeholders'
import { CustomFinancialOperation } from '@/types/entities/CustomFinancialOperation'
import { editCustomOperationFormSchema } from '../../../types/edit-custom-operation-form-schema'
import CustomFinancialOperations from '@/api/services/CustomFinancialOperations'

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
    data?: CustomFinancialOperation
    id: string
    isLoading: boolean
    isError: boolean
}

export default function EditCustomOperationForm({
    setIsOpened,
    id,
    isError,
    isLoading,
    data,
}: Props) {
    const form = useForm<z.infer<typeof editCustomOperationFormSchema>>({
        resolver: zodResolver(editCustomOperationFormSchema),
        defaultValues: {
            name: data?.name,
        },
    })

    function defaultOnSuccess() {
        setIsOpened(false)
        toast('Операция была успешно отредактирована.', {
            cancel: {
                label: 'Ок',
                onClick() {
                    toast.dismiss
                },
            },
        })
    }

    const [errorMessage, setErrorMessage] = useState('')
    const { mutate, isPending } = CustomFinancialOperations.useEdit({
        setErrorMessage,
        onSuccess: defaultOnSuccess,
        id,
    })

    function onSubmit(values: z.infer<typeof editCustomOperationFormSchema>) {
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
                                    <AsyncInput
                                        input={
                                            <Input
                                                placeholder={
                                                    customOperationName
                                                }
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
