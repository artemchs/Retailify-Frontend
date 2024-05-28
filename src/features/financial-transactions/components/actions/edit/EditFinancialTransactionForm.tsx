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
import FinancialTransactions from '@/api/services/FinancialTransactions'
import { DatePickerWithPresets } from '@/components/ui/date-picker'
import SelectOperationType from '../../shared/SelectOperationType'
import { Textarea } from '@/components/ui/textarea'
import SelectPayee from '../../shared/SelectPayee'
import { editFinancialTransactionFormSchema } from '@/features/financial-transactions/types/edit-financial-transaction-form-schema'
import { FinancialTransaction } from '@/types/entities/FinancialTransaction'
import AsyncInput from '@/components/forms/AsyncInput'

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
    data?: FinancialTransaction
    isLoading: boolean
    isError: boolean
    id: string
}

export default function EditFinancialTransactionForm({
    setIsOpened,
    data,
    isError,
    isLoading,
    id,
}: Props) {
    const form = useForm<z.infer<typeof editFinancialTransactionFormSchema>>({
        resolver: zodResolver(editFinancialTransactionFormSchema),
        defaultValues: {
            amount: data?.amount ? parseFloat(data?.amount) : undefined,
            comment: data?.comment ?? undefined,
            customOperationId: data?.customOperationId ?? undefined,
            date: data?.date ? new Date(data.date) : new Date(),
            supplierId: data?.supplierId ?? undefined,
            type:
                data?.type === 'SUPPLIER_PAYMENT'
                    ? 'SUPPLIER_PAYMENT'
                    : data?.type === 'OTHER'
                    ? 'OTHER'
                    : undefined,
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
    const { mutate, isPending } = FinancialTransactions.useEdit({
        setErrorMessage,
        onSuccess,
        id,
    })

    function onSubmit(
        values: z.infer<typeof editFinancialTransactionFormSchema>
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
                                    <AsyncInput
                                        input={
                                            <DatePickerWithPresets
                                                fieldName='date'
                                                field={field}
                                                form={form}
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
                        name='amount'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelForRequiredFields text='Сумма' />
                                <FormControl>
                                    <AsyncInput
                                        input={
                                            <Input type='number' {...field} />
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
                        name='type'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelForRequiredFields text='Тип' />
                                <FormControl>
                                    <AsyncInput
                                        input={
                                            <SelectOperationType
                                                field={field}
                                            />
                                        }
                                        isError={isError}
                                        isLoading={isLoading}
                                        heightClassName='h-20'
                                    />
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
                                    <AsyncInput
                                        input={<Textarea {...field} />}
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
