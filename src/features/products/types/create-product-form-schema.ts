import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createProductFormSchema = z.object({
  categoryId: z.string().min(1, requiredField),
  brandId: z.string().min(1, requiredField),
  title: z.string().min(1, requiredField),
  description: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'UNISEX']),
  season: z.enum(['WINTER', 'SPRING_FALL', 'SUMMER', 'ALL_SEASON']),
  colors: z
    .array(
      z.object({
        id: z.string().min(1, 'Color id is required'),
        name: z.string(),
        index: z.number().min(0),
      })
    )
    .optional(),
  media: z
    .array(
      z.object({
        id: z.string().min(1, 'Media id is required'),
        index: z.number().min(0),
      })
    )
    .optional(),
  characteristics: z
    .array(
      z.object({
        id: z.string().min(1, 'Укажите характеристику.'),
      })
    )
    .optional(),
  packagingLength: z.number().min(1, requiredField),
  packagingWidth: z.number().min(1, requiredField),
  packagingHeight: z.number().min(1, requiredField),
  packagingWeight: z.number().min(1, requiredField),
})

export type CreateProductFormSchema = z.infer<typeof createProductFormSchema>
