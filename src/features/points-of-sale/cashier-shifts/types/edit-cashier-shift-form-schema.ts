import { z } from 'zod'
import { createCashierShiftFormSchema } from './create-cashier-shift-form-schema'

export const editCashierShiftFormSchema = createCashierShiftFormSchema

export type EditCashierShiftFormSchema = z.infer<
  typeof editCashierShiftFormSchema
>
