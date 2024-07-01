import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { Form } from '../types'
import { useWatch } from 'react-hook-form'
import AsyncInput from '@/components/forms/AsyncInput'
import { ProductFields } from '@/features/import/types/product-fields'

export default function AddFieldButton({
    form,
    isDataLoading,
    isDataError,
}: {
    form: Form
    isDataLoading?: boolean
    isDataError?: boolean
}) {
    const schema = useWatch({
        control: form.control,
        name: 'schema',
    })

    return (
        <AsyncInput
            input={
                <Button
                    type='button'
                    variant='outline'
                    onClick={() =>
                        form.setValue('schema', [
                            ...schema,
                            {
                                field: ProductFields.PRODUCT_ID,
                                incomingFileField: '',
                                isAdditionalField: false,
                            },
                        ])
                    }
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
