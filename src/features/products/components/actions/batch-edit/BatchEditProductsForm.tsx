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
import BrandsCombobox from '@/features/brands/components/shared/BrandsCombobox'
import CategoriesCombobox from '@/features/categories/components/shared/CategoriesCombobox'
import ColorsCombobox from '@/features/colors/components/shared/ColorsCombobox'
import { batchEditProductsFormSchema } from '@/features/products/types/batch-edit-products-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import SelectGender from '../../shared/form/SelectGender'
import SelectSeason from '../../shared/form/SelectSeason'
import TextEditor from '../../shared/form/text-editor/TextEditor'
import ProductTagsCombobox from '@/features/product-tags/components/shared/ProductTagsCombobox'
import UploadMediaInput from '../../shared/form/media/UploadMediaInput'
import CharacteristicsInput from '../../shared/form/characteristics/CharacteristicsInput'

type Props = {
    ids: string[]
    setIsOpened: (arg0: boolean) => void
}

const BatchEditProductsForm = ({ ids, setIsOpened }: Props) => {
    const form = useForm<z.infer<typeof batchEditProductsFormSchema>>({
        resolver: zodResolver(batchEditProductsFormSchema),
        defaultValues: {
            colors: [],
            productIds: ids,
            tags: [],
            media: [],
            characteristics: [],
        },
    })

    function onSuccess() {
        setIsOpened(false)
        toast(`${ids.length} товаров были успешно отредактированы.`, {
            cancel: {
                label: 'Ок',
                onClick() {
                    toast.dismiss
                },
            },
        })
    }

    const [errorMessage, setErrorMessage] = useState('')
    const { mutate, isPending } = Products.useBatchEdit({
        setErrorMessage,
        onSuccess,
    })

    function onSubmit(values: z.infer<typeof batchEditProductsFormSchema>) {
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
                        name='media'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor='mediaInput'>
                                    Медиа:
                                </FormLabel>
                                <FormControl>
                                    <UploadMediaInput
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
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Описание:</FormLabel>
                                <FormControl>
                                    <TextEditor
                                        content={field.value}
                                        setContent={(newValue) =>
                                            form.setValue(
                                                'description',
                                                newValue
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='tags'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Дополнительные теги для модели товара:
                                </FormLabel>
                                <FormControl>
                                    <ProductTagsCombobox
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
                        name='brandId'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Бренд:</FormLabel>
                                <FormControl>
                                    <BrandsCombobox field={field} form={form} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='categoryId'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Категория:</FormLabel>
                                <FormControl>
                                    <CategoriesCombobox
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
                        name='supplierSku'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Родной артикул:</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='colors'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Цвета:</FormLabel>
                                <FormControl>
                                    <ColorsCombobox field={field} form={form} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='gender'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пол:</FormLabel>
                                <SelectGender field={field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='season'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Сезон:</FormLabel>
                                <SelectSeason field={field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='characteristics'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Характеристики модели товара:
                                </FormLabel>
                                <FormControl>
                                    <CharacteristicsInput
                                        control={form.control}
                                        field={field}
                                        form={form}
                                        withCategory={false}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='packagingHeight'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Высота упаковки (см):</FormLabel>
                                <FormControl>
                                    <Input {...field} type='number' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='packagingLength'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Длина упаковки (см):</FormLabel>
                                <FormControl>
                                    <Input {...field} type='number' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='packagingWidth'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Ширина упаковки (см):</FormLabel>
                                <FormControl>
                                    <Input {...field} type='number' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='packagingWeight'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Вес упаковки (кг):</FormLabel>
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

export default BatchEditProductsForm
