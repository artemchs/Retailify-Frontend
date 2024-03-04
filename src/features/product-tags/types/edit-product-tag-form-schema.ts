import { z } from 'zod'
import { createProductTagFormSchema } from './create-product-tag-form-schema'

export const editProductTagFormSchema = createProductTagFormSchema

export type EditProductTagFormSchema = z.infer<typeof editProductTagFormSchema>
