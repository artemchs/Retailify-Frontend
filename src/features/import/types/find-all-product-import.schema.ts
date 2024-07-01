import { z } from 'zod'

export const findAllProductImportSchema = z.object({
    page: z.number().catch(1),
    query: z.string().optional(),
    rowsPerPage: z.number().catch(20),
    orderBy: z
        .object({
            createdAt: z.enum(['asc', 'desc']).optional(),
        })
        .optional(),
})

export type FindAllProductImportSchema = z.infer<
    typeof findAllProductImportSchema
>
