import { z } from 'zod'

export const findAllCustomerSchema = z.object({
  page: z.number().catch(1),
  query: z.string().optional(),
  rowsPerPage: z.number().catch(20),
  orderBy: z
    .object({
      createdAt: z.enum(['asc', 'desc']).optional(),
      updatedAt: z.enum(['asc', 'desc']).optional(),
      firstName: z.enum(['asc', 'desc']).optional(),
      lastName: z.enum(['asc', 'desc']).optional(),
      email: z.enum(['asc', 'desc']).optional(),
      phoneNumber: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
})

export type FindAllCustomerSchema = z.infer<typeof findAllCustomerSchema>
