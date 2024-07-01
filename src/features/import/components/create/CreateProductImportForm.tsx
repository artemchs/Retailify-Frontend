import { useForm } from 'react-hook-form'
import {
    CreateProductImportSchema,
    createProductImportSchema,
} from '../../types/create-product-import.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { AlertDestructive } from '@/components/AlertDestructive'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import SaveButton from '@/components/forms/SaveButton'
import { Textarea } from '@/components/ui/textarea'
import ProductImport from '@/api/services/ProductImport'
import UploadImportFile from '../shared/form/UploadImportFile'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import SelectWarehouse from '@/features/warehouses/components/shared/SelectWarehouse'
import ImportSourcesCombobox from '../../sources/components/find-all/ImportSourcesCombobox'

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateProductImportForm({ setIsOpened }: Props) {
    const form = useForm<CreateProductImportSchema>({
        resolver: zodResolver(createProductImportSchema),
        defaultValues: {
            warehouseId: '',
            importSourceId: '',
            comment: '',
            fileKey: '',
        },
    })

    function onSuccess() {
        setIsOpened(false)
        toast('Новый источник импорта успешно создан.', {
            cancel: {
                label: 'Ок',
                onClick() {
                    toast.dismiss
                },
            },
        })
    }

    const [errorMessage, setErrorMessage] = useState('')
    const { mutate, isPending } = ProductImport.useCreate({
        setErrorMessage,
        onSuccess,
    })

    function onSubmit(values: CreateProductImportSchema) {
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
                        name='warehouseId'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelForRequiredFields text='Склад' />
                                <FormControl>
                                    <SelectWarehouse
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
                        name='importSourceId'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelForRequiredFields text='Источник импорта' />
                                <FormControl>
                                    <ImportSourcesCombobox
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
                        name='comment'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Комментарий:</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className='resize-none'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <UploadImportFile form={form} />
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
