import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createInventoryTransferReasonFormSchema = z.object({
  name: z.string().min(1, requiredField),
})

export type CreateInventoryTransferReasonFormSchema = z.infer<
  typeof createInventoryTransferReasonFormSchema
>
