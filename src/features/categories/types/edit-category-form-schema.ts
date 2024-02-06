import { z } from 'zod'
import { createCategoryFormSchema } from './create-category-form-schema'

export const editCategoryFormSchema = createCategoryFormSchema

export type editCategoryFormSchema = z.infer<typeof editCategoryFormSchema>
