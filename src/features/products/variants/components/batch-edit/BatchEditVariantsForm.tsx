import Products from '@/api/services/Products'
import { AlertDestructive } from '@/components/AlertDestructive'
import SaveButton from '@/components/forms/SaveButton'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { batchEditVariantsFormSchema } from '../../types/batch-edit-variants-form-schema'

type Props = {
    ids: string[]
    setIsOpened: (arg0: boolean) => void
}

const BatchEditVariantsForm = ({ ids, setIsOpened }: Props) => {
    const form = useForm<z.infer<typeof batchEditVariantsFormSchema>>({
        resolver: zodResolver(batchEditVariantsFormSchema),
        defaultValues: {
            variantIds: ids,
        },
    })

    function onSuccess() {
        setIsOpened(false)
        toast(`${ids.length} вариантов были успешно отредактированы.`, {
            cancel: {
                label: 'Ок',
                onClick() {
                    toast.dismiss
                },
            },
        })
    }

    const [errorMessage, setErrorMessage] = useState('')
    const { mutate, isPending } = Products.useBatchEditVariants({
        setErrorMessage,
        onSuccess,
    })

    function onSubmit(values: z.infer<typeof batchEditVariantsFormSchema>) {
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
                        name='sale'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Скидка (грн):</FormLabel>
                                <FormControl>
                                    <Input {...field} type='number' />
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

export default BatchEditVariantsForm
