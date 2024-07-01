import { UseFormReturn } from 'react-hook-form'

export type Form = UseFormReturn<
    {
        importSourceId: string
        warehouseId: string
        fileKey: string
        comment?: string | undefined
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
>
