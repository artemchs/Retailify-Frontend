import { z } from 'zod'
import { createFinancialTransactionFormSchema } from './create-financial-transaction-form-schema'

export const editFinancialTransactionFormSchema =
    createFinancialTransactionFormSchema

export type EditFinancialTransactionFormSchema = z.infer<
    typeof editFinancialTransactionFormSchema
>
