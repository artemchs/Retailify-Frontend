import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createCollectionFormSchema = z.object({
  name: z.string().min(1, requiredField),
  parentId: z.string().optional(),
  characteristics: z
    .array(
      z.object({
        id: z.string().min(1, 'Укажите характеристику.'),
      })
    )
    .optional(),
})

export type CreateCollectionFormSchema = z.infer<
  typeof createCollectionFormSchema
>
