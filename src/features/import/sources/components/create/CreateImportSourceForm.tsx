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
import SaveButton from '@/components/forms/SaveButton'
import { createImportSourceSchema } from '../../types/create-import-source.schema'
import ImportSource from '@/api/services/ImportSource'
import { CreateImportSourceDialogProps } from './CreateImportSourceDialog'
import ImportSourceNameField from '../shared/form/ImportSourceNameField'
import ImportSourceSchemaFields from '../shared/form/ImportSourceSchemaFields'
import AddFieldButton from '../shared/form/AddFieldButton'
import { ImportSource as ImportSourceType } from '@/types/entities/ImportSource'

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
} & CreateImportSourceDialogProps

export default function CreateImportSourceForm({
    setIsOpened,
    setSelectedValue,
}: Props) {
    const form = useForm<z.infer<typeof createImportSourceSchema>>({
        resolver: zodResolver(createImportSourceSchema),
        defaultValues: {
            name: '',
            schema: [],
        },
    })

    function onSuccess(data: ImportSourceType) {
        setIsOpened(false)
        toast('Новый источник импорта успешно создан.', {
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
    const { mutate, isPending } = ImportSource.useCreate({
        setErrorMessage,
        onSuccess,
    })

    function onSubmit(values: z.infer<typeof createImportSourceSchema>) {
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
                    <ImportSourceNameField form={form} />
                    <FormField
                        control={form.control}
                        name='schema'
                        render={({ fieldState }) => (
                            <FormItem>
                                <FormLabelForRequiredFields text='Схема импорта' />
                                <FormControl>
                                    <ImportSourceSchemaFields form={form} />
                                </FormControl>
                                {fieldState.error?.message && <FormMessage />}
                            </FormItem>
                        )}
                    />
                    <AddFieldButton form={form} />
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
