import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

/** Use it only for useDeposit or useWithdraw.
 * It's only for depositing or withdrawing money from a point of sale. **/

export const cashierShiftTransactionFormSchema = z.object({
  amount: z.coerce.number({
    required_error: requiredField,
  }),
})

export type CashierShiftTransactionFormSchema = z.infer<
  typeof cashierShiftTransactionFormSchema
>
