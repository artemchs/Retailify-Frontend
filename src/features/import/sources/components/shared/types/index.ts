import { ProductFields } from '@/features/import/types'
import { UseFormReturn } from 'react-hook-form'

export type Form = UseFormReturn<
    {
        name: string
        schema: {
            incomingFileField: string
            field: ProductFields
            isAdditionalField: boolean
        }[]
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
>
