import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createCategoryFormSchema = z.object({
  name: z.string().min(1, requiredField),
  productName: z.string().min(1, requiredField),
  groupId: z.string().min(1, requiredField),
  characteristics: z
    .array(
      z.object({
        id: z.string().min(1),
      })
    )
    .optional()
    .nullable(),
})

export type CreateCategoryFormSchema = z.infer<typeof createCategoryFormSchema>
