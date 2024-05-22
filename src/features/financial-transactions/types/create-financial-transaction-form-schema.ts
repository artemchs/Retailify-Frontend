import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'
import {
    financialTransactionDirection,
    financialTransactionType,
} from '@/types/entities/FinancialTransaction'

export const createFinancialTransactionFormSchema = z.object({
    amount: z.coerce.number({
        required_error: requiredField,
    }),
    type: z.enum(financialTransactionType, {
        required_error: requiredField,
    }),
    direction: z.enum(financialTransactionDirection, {
        required_error: requiredField,
    }),
    shiftId: z.string().optional(),
    orderInvoiceId: z.string().optional(),
    refundId: z.string().optional(),
})

export type CreateFinancialTransactionFormSchema = z.infer<
    typeof createFinancialTransactionFormSchema
>
