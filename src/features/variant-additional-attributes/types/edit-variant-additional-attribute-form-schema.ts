import { z } from 'zod'
import { createVariantAdditionalAttributeFormSchema } from './create-variant-additiona-attribute-form-schema'

export const editVariantAdditionalAttributeFormSchema =
  createVariantAdditionalAttributeFormSchema

export type EditVariantAdditionalAttributeFormSchema = z.infer<
  typeof editVariantAdditionalAttributeFormSchema
>
