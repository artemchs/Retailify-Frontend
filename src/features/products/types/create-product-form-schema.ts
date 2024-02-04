import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createProductFormSchema = z.object({
  collectionId: z.string().min(1, requiredField),
  title: z.string().min(1, requiredField),
  description: z.string().min(1, requiredField),
  colors: z
    .array(
      z.object({
        colorId: z.string().min(1, 'Color id is required'),
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
