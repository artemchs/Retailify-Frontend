import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createWarehouseFormSchema = z.object({
  name: z.string().min(1, requiredField),
  address: z.string().min(1, requiredField),
})

export type CreateWarehouseFormSchema = z.infer<
  typeof createWarehouseFormSchema
>
