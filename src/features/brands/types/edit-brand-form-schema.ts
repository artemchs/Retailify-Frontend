import { z } from 'zod'
import { createBrandFormSchema } from './create-brand-form-schema'

export const editBrandFormSchema = createBrandFormSchema

export type EditBrandFormSchema = z.infer<typeof editBrandFormSchema>
