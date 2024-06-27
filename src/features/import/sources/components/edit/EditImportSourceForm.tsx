import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { AlertDestructive } from '@/components/AlertDestructive'
import { zodResolver } from '@hookform/resolvers/zod'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import SaveButton from '@/components/forms/SaveButton'
import ImportSource from '@/api/services/ImportSource'
import ImportSourceNameField from '../shared/form/ImportSourceNameField'
import ImportSourceSchemaFields from '../shared/form/ImportSourceSchemaFields'
import AddFieldButton from '../shared/form/AddFieldButton'
import { editImportSourceSchema } from '../../types/edit-import-source.schema'
import { ImportSource as ImportSourceType } from '@/types/entities/ImportSource'

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
    id: string
    data?: ImportSourceType
    isLoading: boolean
    isError: boolean
}

export default function EditImportSourceForm({
    setIsOpened,
    id,
    data,
    isError,
    isLoading,
}: Props) {
    const form = useForm<z.infer<typeof editImportSourceSchema>>({
        resolver: zodResolver(editImportSourceSchema),
        defaultValues: {
            name: data?.name,
            schema: data?.schema ? JSON.parse(data.schema) : [],
        },
    })

    function onSuccess() {
        setIsOpened(false)
        toast('Источник импорта был отредактирован', {
            cancel: {
                label: 'Ок',
                onClick() {
                    toast.dismiss
                },
            },
        })
    }

    const [errorMessage, setErrorMessage] = useState('')
    const { mutate, isPending } = ImportSource.useEdit({
        setErrorMessage,
        onSuccess,
        id,
    })

    function onSubmit(values: z.infer<typeof editImportSourceSchema>) {
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
                    <ImportSourceNameField
                        form={form}
                        isDataError={isError}
                        isDataLoading={isLoading}
                    />
                    <FormLabelForRequiredFields text='Схема импорта' />
                    <ImportSourceSchemaFields
                        form={form}
                        isDataError={isError}
                        isDataLoading={isLoading}
                    />
                    <AddFieldButton
                        form={form}
                        isDataError={isError}
                        isDataLoading={isLoading}
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
