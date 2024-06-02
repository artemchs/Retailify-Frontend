import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const batchEditVariantsFormSchema = z.object({
    variantIds: z.array(z.string(), {
        required_error: requiredField,
    }),
    sale: z.coerce.number().optional(),
})

export type BatchEditVariantsFormSchema = z.infer<
    typeof batchEditVariantsFormSchema
>
