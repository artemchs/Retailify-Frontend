import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

const SUPPLIER_PAYMENT = 'SUPPLIER_PAYMENT'
const OTHER = 'OTHER'

export const createFinancialTransactionFormSchema = z
    .object({
        date: z.date({ required_error: requiredField }),
        amount: z.coerce.number({
            required_error: requiredField,
        }),
        type: z.enum([SUPPLIER_PAYMENT, OTHER], {
            required_error: requiredField,
        }),
        supplierId: z.string().optional(),
        customOperationId: z.string().optional(),
        comment: z.string().optional(),
    })
    .refine((data) => {
        if (data.type === SUPPLIER_PAYMENT) {
            if (!data.supplierId) {
                throw new z.ZodError([
                    {
                        message:
                            'Пожалуйста, укажите поставщика для типа "Оплата поставщику".',
                        path: ['supplierId'],
                        code: 'custom',
                    },
                ])
            }
        }
        if (data.type === OTHER) {
            if (!data.customOperationId) {
                throw new z.ZodError([
                    {
                        message:
                            'Пожалуйста, укажите операцию для типа "Другое".',
                        path: ['customOperationId'],
                        code: 'custom',
                    },
                ])
            }
        }
        return true
    })

export type CreateFinancialTransactionFormSchema = z.infer<
    typeof createFinancialTransactionFormSchema
>
