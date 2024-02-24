import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createInventoryAdjustmentReasonFormSchema = z.object({
  name: z.string().min(1, requiredField),
})

export type CreateInventoryAdjustmentReasonFormSchema = z.infer<
  typeof createInventoryAdjustmentReasonFormSchema
>
