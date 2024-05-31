import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const batchEditProductsFormSchema = z.object({
    brandId: z.string().optional(),
    categoryId: z.string().optional(),
    supplierSku: z.string().optional(),
    colors: z
        .array(
            z.object({
                id: z.string(),
                index: z.number(),
            })
        )
        .optional(),
    gender: z.enum(['MALE', 'FEMALE', 'UNISEX']).optional(),
    season: z
        .enum(['WINTER', 'SPRING_FALL', 'SUMMER', 'ALL_SEASON'])
        .optional(),
    packagingLength: z.number().optional(),
    packagingWidth: z.number().optional(),
    packagingHeight: z.number().optional(),
    packagingWeight: z.number().optional(),
    productIds: z.array(z.string(), {
        required_error: requiredField,
    }),
})

export type BatchEditProductsFormSchema = z.infer<
    typeof batchEditProductsFormSchema
>
