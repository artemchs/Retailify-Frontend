import { z } from 'zod'
import {
    financialTransactionDirection,
    financialTransactionType,
} from '@/types/entities/FinancialTransaction'

export const financialTransactionsSearchParams = z.object({
    page: z.number().catch(1),
    query: z.string().optional(),
    rowsPerPage: z.number().catch(20),
    createdAt: z
        .object({
            from: z
                .date({
                    coerce: true,
                })
                .optional(),
            to: z
                .date({
                    coerce: true,
                })
                .optional(),
        })
        .optional(),
    types: z.array(z.enum(financialTransactionType)).optional(),
    directions: z.array(z.enum(financialTransactionDirection)).optional(),
    systemUserIds: z.array(z.string()).optional(),
    orderBy: z
        .object({
            amount: z.enum(['asc', 'desc']).optional(),
            date: z.enum(['asc', 'desc']).optional(),
        })
        .optional(),
})

export type FinancialTransactionsSearchParams = z.infer<
    typeof financialTransactionsSearchParams
>
