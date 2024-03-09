import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createCashierShiftFormSchema = z.object({
  startingCashBalance: z.coerce.number({
    required_error: requiredField,
  }),
})

export type CreateCashierShiftFormSchema = z.infer<
  typeof createCashierShiftFormSchema
>
