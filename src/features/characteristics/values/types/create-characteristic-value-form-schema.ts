import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createCharacteristicValueFormSchema = z.object({
  value: z.string().min(1, requiredField),
})

export type CreateCharacteristicValueFormSchema = z.infer<
  typeof createCharacteristicValueFormSchema
>
