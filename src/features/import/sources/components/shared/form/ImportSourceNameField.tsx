import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Form } from '../types'
import AsyncInput from '@/components/forms/AsyncInput'

type Props = {
    form: Form
    isDataLoading?: boolean
    isDataError?: boolean
}

export default function ImportSourceNameField({
    form,
    isDataError,
    isDataLoading,
}: Props) {
    return (
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
                                    placeholder='Название этого источника импорта...'
                                    {...field}
                                />
                            }
                            isError={!!isDataError}
                            isLoading={!!isDataLoading}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
