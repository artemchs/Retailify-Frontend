import { z } from 'zod'
import { createVariantFormSchema } from './create-variant-form-schema'

export const editVariantFormSchema = createVariantFormSchema

export type EditVariantFormSchema = z.infer<typeof createVariantFormSchema>
