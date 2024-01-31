import { z } from 'zod'
import { createProductFormSchema } from './create-product-form-schema'

export const editProductFormSchema = createProductFormSchema

export type EditProductFormSchema = z.infer<typeof editProductFormSchema>
