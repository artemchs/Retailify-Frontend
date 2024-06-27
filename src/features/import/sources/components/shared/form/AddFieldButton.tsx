import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { Form } from '../types'
import { ProductFields } from '@/features/import/types'
import { useFieldArray } from 'react-hook-form'
import AsyncInput from '@/components/forms/AsyncInput'

export default function AddFieldButton({
    form,
    isDataLoading,
    isDataError,
}: {
    form: Form
    isDataLoading?: boolean
    isDataError?: boolean
}) {
    const { fields } = useFieldArray({
        name: 'schema',
        control: form.control,
    })

    return (
        <AsyncInput
            input={
                <Button
                    type='button'
                    variant='outline'
                    onClick={() => {
                        form.setValue('schema', [
                            ...fields,
                            {
                                field: ProductFields.PRODUCT_ID,
                                incomingFileField: '',
                                isAdditionalField: false,
                            },
                        ])
                    }}
                >
                    <PlusIcon className='h-4 w-4 mr-2 shrink-0' />
                    Добавить поле
                </Button>
            }
            isError={!!isDataError}
            isLoading={!!isDataLoading}
        />
    )
}
