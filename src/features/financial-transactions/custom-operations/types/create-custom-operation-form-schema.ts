import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createCustomOperationFormSchema = z.object({
    name: z.string().min(1, requiredField),
})

export type CreateCustomOperationFormSchema = z.infer<
    typeof createCustomOperationFormSchema
>
