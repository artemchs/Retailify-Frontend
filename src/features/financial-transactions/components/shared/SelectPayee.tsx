import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import CustomOperationsCombobox from '@/features/financial-transactions/custom-operations/components/shared/CustomOperationsCombobox'
import SelectSupplier from '@/features/suppliers/components/shared/SelectSupplier'
import { UseFormReturn, useWatch } from 'react-hook-form'

type Props = {
    form: UseFormReturn<
        {
            date: Date
            amount: number
            type: 'SUPPLIER_PAYMENT' | 'OTHER'
            supplierId?: string | undefined
            customOperationId?: string | undefined
            comment?: string | undefined
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any,
        undefined
    >
}

export default function SelectPayee({ form }: Props) {
    const type = useWatch({
        control: form.control,
        name: 'type',
    })

    if (type === 'SUPPLIER_PAYMENT')
        return <SelectSupplierFormField form={form} />

    if (type === 'OTHER') return <SelectCustomOperationFormField form={form} />

    return <></>
}

function SelectSupplierFormField({ form }: Props) {
    return (
        <FormField
            control={form.control}
            name='supplierId'
            render={({ field }) => (
                <FormItem>
                    <FormLabelForRequiredFields text='Поставщик' />
                    <FormControl>
                        <SelectSupplier form={form} field={field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

function SelectCustomOperationFormField({ form }: Props) {
    return (
        <FormField
            control={form.control}
            name='customOperationId'
            render={({ field }) => (
                <FormItem>
                    <FormLabelForRequiredFields text='Операция' />
                    <FormControl>
                        <CustomOperationsCombobox field={field} form={form} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
