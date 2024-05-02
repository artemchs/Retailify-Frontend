import { AlertDestructive } from '@/components/AlertDestructive'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import UpdatePasswordForm from './UpdatePasswordForm'
import { useNavigate } from '@tanstack/react-router'
import Users from '@/api/services/Users'
import { updatePasswordDialogFormSchema } from './update-password-dialog-form-schema'
import { z } from 'zod'

type Props = {
  isOpened: boolean
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UpdatePasswordDialog({ isOpened, setIsOpened }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  function onSuccess() {
    setIsOpened(false)
    navigate({ to: '/auth/log-in' })
  }
  const { mutate, isPending } = Users.useUpdatePassword({
    onSuccess,
    setErrorMessage,
  })

  function onSubmit(values: z.infer<typeof updatePasswordDialogFormSchema>) {
    mutate(values)
  }

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Изменить пароль</DialogTitle>
          <DialogDescription>
            После успешного изменения пароля вы будете перенесены на страницу
            авторизации.
          </DialogDescription>
        </DialogHeader>
        {errorMessage && errorMessage.length && (
          <AlertDestructive text={errorMessage} />
        )}
        <UpdatePasswordForm onSubmit={onSubmit} isPending={isPending} />
      </DialogContent>
    </Dialog>
  )
}
