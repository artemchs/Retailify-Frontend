import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { editProfileDialogFormSchema } from './edit-profile-dialog-form-schema'
import { z } from 'zod'
import EditProfileForm from './EditProfileForm'
import Users from '@/api/services/Users'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { useState } from 'react'
import { AlertDestructive } from '@/components/AlertDestructive'

type Props = {
  isOpened: boolean
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditProfileDialog({ isOpened, setIsOpened }: Props) {
  const { data, isLoading, isError } = Users.useGetMe()

  const [errorMessage, setErrorMessage] = useState('')
  function onSuccess() {
    setIsOpened(false)
    queryClient.invalidateQueries({ queryKey: ['users', 'me'] })
  }
  const { mutate, isPending } = Users.useUpdateMe({
    onSuccess,
    setErrorMessage,
  })

  function onSubmit(values: z.infer<typeof editProfileDialogFormSchema>) {
    mutate(values)
  }

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Редактировать профиль</DialogTitle>
        </DialogHeader>
        {errorMessage && errorMessage.length && (
          <AlertDestructive text={errorMessage} />
        )}
        <EditProfileForm
          isLoading={isLoading}
          isError={isError}
          email={data?.email ? data.email : ''}
          fullName={data?.fullName ? data.fullName : ''}
          profilePictureUrl={
            data?.profilePicture ? data.profilePicture : undefined
          }
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
