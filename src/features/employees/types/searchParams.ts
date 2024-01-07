import { z } from 'zod'

export const employeesSearchParamsSchema = z.object({
  page: z.number().catch(1),
  query: z.string().optional(),
  rowsPerPage: z.number().catch(20),
  roles: z.array(z.string()).optional(),
  orderBy: z
    .object({
      fullName: z.enum(['asc', 'desc']).optional(),
      email: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
})

export type EmployeesSearchParams = z.infer<typeof employeesSearchParamsSchema>
