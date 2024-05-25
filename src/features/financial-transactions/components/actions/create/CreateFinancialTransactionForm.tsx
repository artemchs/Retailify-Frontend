import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { AlertDestructive } from '@/components/AlertDestructive'
import { zodResolver } from '@hookform/resolvers/zod'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { Input } from '@/components/ui/input'
import SaveButton from '@/components/forms/SaveButton'
import { createFinancialTransactionFormSchema } from '@/features/financial-transactions/types/create-financial-transaction-form-schema'
import FinancialTransactions from '@/api/services/FinancialTransactions'
import { DatePickerWithPresets } from '@/components/ui/date-picker'
import SelectOperationType from './SelectOperationType'
import { Textarea } from '@/components/ui/textarea'
import SelectPayee from './SelectPayee'

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateFinancialTransactionForm({ setIsOpened }: Props) {
    const form = useForm<z.infer<typeof createFinancialTransactionFormSchema>>({
        resolver: zodResolver(createFinancialTransactionFormSchema),
        defaultValues: {
            amount: 0,
            date: new Date(),
            type: 'SUPPLIER_PAYMENT',
        },
    })

    function onSuccess() {
        setIsOpened(false)
        toast('Новая финансовая транзакция успешно создана.', {
            cancel: {
                label: 'Ок',
                onClick() {
                    toast.dismiss
                },
            },
        })
    }

    const [errorMessage, setErrorMessage] = useState('')
    const { mutate, isPending } = FinancialTransactions.useCreate({
        setErrorMessage,
        onSuccess,
    })

    function onSubmit(
        values: z.infer<typeof createFinancialTransactionFormSchema>
    ) {
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
                        name='date'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelForRequiredFields text='Дата' />
                                <FormControl>
                                    <DatePickerWithPresets
                                        fieldName='date'
                                        field={field}
                                        form={form}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='amount'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelForRequiredFields text='Сумма' />
                                <FormControl>
                                    <Input type='number' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='type'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelForRequiredFields text='Тип' />
                                <FormControl>
                                    <SelectOperationType field={field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SelectPayee form={form} />
                    <FormField
                        control={form.control}
                        name='comment'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Комментарий:</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
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
