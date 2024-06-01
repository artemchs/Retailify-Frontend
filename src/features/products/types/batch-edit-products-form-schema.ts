import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

const mediaSchema = z
    .array(
        z.object({
            id: z.string(),
            index: z.number(),
        })
    )
    .optional()

const characteristicsSchema = z.array(
    z.object({
        id: z.string(),
        name: z.string(),
        values: z.array(
            z.object({
                id: z.string(),
                value: z.string(),
            })
        ),
    })
)

const tagsSchema = z.array(z.object({ id: z.string() })).optional()

export const batchEditProductsFormSchema = z.object({
    description: z.string().optional(),
    tags: tagsSchema,
    media: mediaSchema,
    characteristics: characteristicsSchema,
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
