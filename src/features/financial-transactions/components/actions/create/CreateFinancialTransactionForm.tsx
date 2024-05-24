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
import SaveButton from '@/components/forms/SaveButton'
import { createFinancialTransactionFormSchema } from '@/features/financial-transactions/types/create-financial-transaction-form-schema'
import FinancialTransactions from '@/api/services/FinancialTransactions'
import {
    SelectItem,
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { financialTransactionTypes } from '../../shared/constants'
import { DatePickerWithPresets } from '@/components/ui/date-picker'

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateFinancialTransactionForm({ setIsOpened }: Props) {
    const form = useForm<z.infer<typeof createFinancialTransactionFormSchema>>({
        resolver: zodResolver(createFinancialTransactionFormSchema),
        defaultValues: {
            amount: 0,
            type: 'CASH_REGISTER_WITHDRAWAL',
            date: new Date(),
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
        const direction = financialTransactionTypes.find(
            (obj) => obj.value === values.type
        )?.direction as 'CREDIT' | 'DEBIT' | undefined

        if (direction) {
            mutate({
                body: { ...values, direction },
            })
        }
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
                                <FormLabelForRequiredFields text='Тип транзакции' />
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Выберите тип финансовой транзакции' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {financialTransactionTypes.map(
                                            ({ direction, label, value }) => (
                                                <SelectItem
                                                    key={value}
                                                    value={value}
                                                >
                                                    <div className='flex gap-2 items-center justify-between'>
                                                        <span>{label}</span>
                                                        {direction ===
                                                        'CREDIT' ? (
                                                            <ArrowUp className='h-4 w-4 text-destructive' />
                                                        ) : (
                                                            <ArrowDown className='h-4 w-4 text-primary' />
                                                        )}
                                                    </div>
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
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
