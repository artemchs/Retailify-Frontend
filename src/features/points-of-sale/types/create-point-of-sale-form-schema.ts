import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

const cashier = z.object({
  id: z.string(),
  fullName: z.string(),
})

const idWithName = z.object({
  id: z.string(),
  name: z.string(),
})

export const createPosFormSchema = z.object({
  name: z.string().min(1, requiredField),
  address: z.string().min(1, requiredField),
  cashiers: z.array(cashier).refine((data) => data.length >= 1, {
    message: 'Выберите как минимум ондного кассира.',
  }),
  productTags: z.array(idWithName).optional(),
  categories: z.array(idWithName).optional(),
  categoryGroups: z.array(idWithName).optional(),
})

export type CreatePosFormSchema = z.infer<typeof createPosFormSchema>
