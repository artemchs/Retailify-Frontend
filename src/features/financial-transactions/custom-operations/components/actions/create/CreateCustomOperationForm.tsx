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
import { zodResolver } from '@hookform/resolvers/zod'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { Input } from '@/components/ui/input'
import { customOperationName } from '../../shared/placeholders'
import SaveButton from '@/components/forms/SaveButton'
import { CreateCustomOperationDialogProps } from './CreateCustomOperationDialog'
import { createCustomOperationFormSchema } from '../../../types/create-custom-operation-form-schema'
import CustomFinancialOperations from '@/api/services/CustomFinancialOperations'
import { CustomFinancialOperation } from '@/types/entities/CustomFinancialOperation'

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
} & CreateCustomOperationDialogProps

export default function CreateCustomOperationForm({
    setIsOpened,
    setSelectedValue,
}: Props) {
    const form = useForm<z.infer<typeof createCustomOperationFormSchema>>({
        resolver: zodResolver(createCustomOperationFormSchema),
        defaultValues: {
            name: '',
        },
    })

    function onSuccess(data: CustomFinancialOperation) {
        setIsOpened(false)
        toast('Новая операция была успешно добавлена.', {
            cancel: {
                label: 'Ок',
                onClick() {
                    toast.dismiss
                },
            },
        })

        if (setSelectedValue) {
            setSelectedValue(data.id)
        }
    }

    const [errorMessage, setErrorMessage] = useState('')
    const { mutate, isPending } = CustomFinancialOperations.useCreate({
        setErrorMessage,
        onSuccess,
    })

    function onSubmit(values: z.infer<typeof createCustomOperationFormSchema>) {
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
                                    <Input
                                        placeholder={customOperationName}
                                        {...field}
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
