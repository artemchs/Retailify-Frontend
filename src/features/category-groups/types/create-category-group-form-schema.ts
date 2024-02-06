import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createCategoryGroupFormSchema = z.object({
  name: z.string().min(1, requiredField),
  characteristics: z
    .array(
      z.object({
        id: z.string().min(1),
      })
    )
    .optional()
    .nullable(),
})

export type CreateCategoryGroupFormSchema = z.infer<
  typeof createCategoryGroupFormSchema
>
