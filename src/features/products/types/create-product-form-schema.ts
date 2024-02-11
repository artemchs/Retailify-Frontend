import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createProductFormSchema = z.object({
  categoryId: z.string().min(1, requiredField),
  brandId: z.string().min(1, requiredField),
  title: z.string().min(1, requiredField),
  description: z.string().min(1, requiredField),
  gender: z.enum(['MALE', 'FEMALE', 'UNISEX']),
  season: z.enum(['WINTER', 'SPRING_FALL', 'SUMMER', 'ALL_SEASON']),
  colors: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        index: z.number(),
      })
    )
    .min(1, requiredField),
  media: z
    .array(
      z.object({
        id: z.string(),
        index: z.number(),
      })
    )
    .optional(),
  characteristicValues: z
    .array(
      z.object({
        characteristicId: z.string(),
        id: z.string(),
      })
    )
    .optional(),
  packagingLength: z.coerce
    .number({
      required_error: requiredField,
      invalid_type_error: 'Значение должно быть числом',
    })
    .min(0, requiredField),
  packagingWidth: z.coerce
    .number({
      required_error: requiredField,
      invalid_type_error: 'Значение должно быть числом',
    })
    .min(0, requiredField),
  packagingHeight: z.coerce
    .number({
      required_error: requiredField,
      invalid_type_error: 'Значение должно быть числом',
    })
    .min(0, requiredField),
  packagingWeight: z.coerce
    .number({
      required_error: requiredField,
      invalid_type_error: 'Значение должно быть числом',
    })
    .min(0, requiredField),
})

export type CreateProductFormSchema = z.infer<typeof createProductFormSchema>
