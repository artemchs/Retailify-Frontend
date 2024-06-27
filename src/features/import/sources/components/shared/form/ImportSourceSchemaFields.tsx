import { FieldArrayWithId, useFieldArray } from 'react-hook-form'
import { Form } from '../types'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import { ProductFields } from '@/features/import/types'
import AsyncInput from '@/components/forms/AsyncInput'

const PRODUCT_FIELDS = [
    { key: 'Идентификатор товара', value: 'product_id' },
    { key: 'Название товара', value: 'product_title' },
    { key: 'Артикул товара', value: 'product_sku' },
    { key: 'Артикул поставщика', value: 'product_supplierSku' },
    { key: 'ID товара в TorgSoft', value: 'product_torgsoftId' },
    { key: 'ID товара в Prom', value: 'product_promId' },
    { key: 'ID товара в Rozetka', value: 'product_rozetkaId' },
    { key: 'Пол', value: 'product_gender' },
    { key: 'Сезон', value: 'product_season' },
    { key: 'Медиафайлы товара', value: 'product_media' },
    { key: 'ID варианта', value: 'variant_id' },
    { key: 'ID варианта в TorgSoft', value: 'variant_torgsoftId' },
    { key: 'ID варианта в Prom', value: 'variant_promId' },
    { key: 'ID варианта в Rozetka', value: 'variant_rozetkaId' },
    { key: 'Размер', value: 'variant_size' },
    { key: 'Цена', value: 'variant_price' },
    { key: 'Скидка', value: 'variant_sale' },
    { key: 'Количество', value: 'variant_quantity' },
    { key: 'Штрих-код', value: 'variant_barcode' },
]

type Props = {
    form: Form
    isDataLoading?: boolean
    isDataError?: boolean
}

export default function ImportSourceSchemaFields({
    form,
    isDataError,
    isDataLoading,
}: Props) {
    const { fields } = useFieldArray({
        name: 'schema',
        control: form.control,
    })

    return (
        <AsyncInput
            input={
                <div className='flex flex-col gap-4'>
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className='flex flex-col gap-4 p-4 bg-background rounded-md border-2 border-muted'
                        >
                            <SelectSchemaField form={form} index={index} />
                            <IncomingFileField form={form} index={index} />
                            <IsAdditionalFieldCheckbox
                                form={form}
                                index={index}
                            />
                            <RemoveFieldButton
                                fieldId={field.id}
                                fields={fields}
                                form={form}
                            />
                        </div>
                    ))}
                </div>
            }
            isError={!!isDataError}
            isLoading={!!isDataLoading}
            heightClassName='h-60'
        />
    )
}

function SelectSchemaField({ form, index }: { form: Form; index: number }) {
    return (
        <FormField
            control={form.control}
            name={`schema.${index}.field`}
            render={({ field }) => (
                <FormItem>
                    <FormLabelForRequiredFields text='Поле' />
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder='Выберите поле' />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {PRODUCT_FIELDS.map(({ key, value }) => (
                                <SelectItem value={value}>{key}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

function IncomingFileField({ form, index }: { form: Form; index: number }) {
    return (
        <FormField
            control={form.control}
            name={`schema.${index}.incomingFileField`}
            render={({ field }) => (
                <FormItem>
                    <FormLabelForRequiredFields text='Соответствующее поле' />
                    <FormControl>
                        <Input
                            placeholder='Соответствующее поле в файле импорта...'
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

function IsAdditionalFieldCheckbox({
    form,
    index,
}: {
    form: Form
    index: number
}) {
    return (
        <FormField
            control={form.control}
            name={`schema.${index}.isAdditionalField`}
            render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className='leading-none'>
                        <FormLabel>Это дополнительное поле</FormLabel>
                    </div>
                </FormItem>
            )}
        />
    )
}

function RemoveFieldButton({
    form,
    fieldId,
    fields,
}: {
    form: Form
    fieldId: string
    fields: FieldArrayWithId<
        {
            name: string
            schema: {
                incomingFileField: string
                field: ProductFields
                isAdditionalField: boolean
            }[]
        },
        'schema',
        'id'
    >[]
}) {
    return (
        <Button
            variant='secondary'
            type='button'
            onClick={() =>
                form.setValue(
                    'schema',
                    fields.filter((obj) => obj.id !== fieldId)
                )
            }
        >
            <Trash2Icon className='h-4 w-4 mr-2' />
            Убрать поле
        </Button>
    )
}
