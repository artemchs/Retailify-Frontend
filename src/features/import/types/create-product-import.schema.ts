import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createProductImportSchema = z.object({
    warehouseId: z.string().min(1, requiredField),
    importSourceId: z.string().min(1, requiredField),
    fileKey: z.string().min(1, requiredField),
    comment: z.string().optional(),
})

export type CreateProductImportSchema = z.infer<
    typeof createProductImportSchema
>
