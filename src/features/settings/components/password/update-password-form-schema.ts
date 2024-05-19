import { z } from 'zod'

export const updatePasswordFormSchema = z
    .object({
        password: z
            .string()
            .refine(
                (value) =>
                    /^(?=.*[a-z].*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*()_+{}\\[\]:;<>,.?~\\/-]).{8,}$/.test(
                        value
                    ),
                'Пожалуйста, убедитесь, что ваш пароль состоит как минимум из 8 символов, включает 2 заглавные буквы, 3 строчные буквы, 2 цифры (0-9) и 1 специальный символ (!@#$&*).'
            ),
        passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Пароли не совпадают.',
        path: ['passwordConfirm'],
    })
