import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

const variantsSchema = z
  .array(
    z.object({
      id: z.string().optional(),
      size: z.string(),
      price: z.coerce.number(),
      sale: z.coerce.number().optional(),
      isArchived: z.coerce.boolean(),
    })
  )
  .optional()

export type ProductVariantsSchema = z.infer<typeof variantsSchema>

const colorsSchema = z
  .array(
    z.object({
      id: z.string(),
      name: z.string(),
      index: z.number(),
    })
  )
  .min(1, requiredField)

const mediaSchema = z
  .array(
    z.object({
      id: z.string(),
      index: z.number(),
    })
  )
  .optional()

const characteristicValuesSchema = z
  .array(
    z.object({
      characteristicId: z.string(),
      id: z.string(),
    })
  )
  .optional()

const productTagsSchema = z.array(z.object({ id: z.string() })).optional()

const packagingDimensionsSchema = z.coerce
  .number({
    required_error: requiredField,
    invalid_type_error: 'Значение должно быть числом',
  })
  .min(0, requiredField)

export const createProductFormSchema = z.object({
  categoryId: z.string().min(1, requiredField),
  brandId: z.string().min(1, requiredField),
  title: z.string().min(1, requiredField),
  description: z.string().min(1, requiredField),
  gender: z.enum(['MALE', 'FEMALE', 'UNISEX']),
  season: z.enum(['WINTER', 'SPRING_FALL', 'SUMMER', 'ALL_SEASON']),
  tags: productTagsSchema,
  colors: colorsSchema,
  variants: variantsSchema,
  media: mediaSchema,
  characteristicValues: characteristicValuesSchema,
  packagingLength: packagingDimensionsSchema,
  packagingWidth: packagingDimensionsSchema,
  packagingHeight: packagingDimensionsSchema,
  packagingWeight: packagingDimensionsSchema,
})

export type CreateProductFormSchema = z.infer<typeof createProductFormSchema>
