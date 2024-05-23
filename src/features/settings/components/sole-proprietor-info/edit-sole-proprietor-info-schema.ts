import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

const currentAccount = z.object({
    id: z.string().optional(),
    iban: z
        .string()
        .min(1, requiredField)
        .max(
            34,
            'Максимальная длина этого поля составляет 34 буквенно-цифровых символа'
        ),
    name: z.string().min(1, requiredField),
    uuid: z.string().optional(),
})

export const editSoleProprietorInfoSchema = z.object({
    tin: z.coerce.number(),
    currentAccounts: z.array(currentAccount).optional(),
    taxAddress: z.string().optional(),
    taxGroup: z.string().optional(),
    phoneNumber: z.string().optional(),
})

export type EditSoleProprietorInfoCurrentAccountSchema = z.infer<
    typeof currentAccount
>
export type EditSoleProprietorInfoSchema = z.infer<
    typeof editSoleProprietorInfoSchema
>
