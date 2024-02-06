import { z } from 'zod'
import { createCategoryGroupFormSchema } from './create-category-group-form-schema'

export const editCategoryGroupFormSchema = createCategoryGroupFormSchema

export type EditCategoryGroupFormSchema = z.infer<
  typeof editCategoryGroupFormSchema
>
