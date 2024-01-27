import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createCharacteristicFormSchema = z.object({
  name: z.string().min(1, requiredField),
})

export type CreateCharacteristicFormSchema = z.infer<
  typeof createCharacteristicFormSchema
>
