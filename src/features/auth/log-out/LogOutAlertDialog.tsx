import Auth from '@/api/services/Auth'
import AlertDialogFooter from '@/components/dialogs/AlertDialogFooter'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { Loader2, LogOut } from 'lucide-react'
import { useState } from 'react'

export default function LogOutAlertDialog() {
    const [isOpened, setIsOpened] = useState(false)

    const navigate = useNavigate()
    function onSuccess() {
        navigate({ to: '/auth/log-in' })
    }
    const { mutate, isPending } = Auth.useLogOut({ onSuccess })

    return (
        <AlertDialog open={isOpened} onOpenChange={setIsOpened}>
            <AlertDialogTrigger asChild>
                <Button variant='destructive'>
                    <LogOut className='h-4 w-4 mr-2' />
                    Выйти из аккаунта
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Выйти из аккаунта</AlertDialogTitle>
                    <AlertDialogDescription>
                        Вы уверены что вы хотите выйти из своего аккаунта?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter
                    cancelAction={() => setIsOpened(false)}
                    submitButtonVariant='destructive'
                    submitButtonChildren={
                        <>
                            {isPending ? (
                                <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                            ) : (
                                <LogOut className='h-4 w-4 mr-2' />
                            )}
                            Выйти из аккаунта
                        </>
                    }
                    isPending={isPending}
                    submitAction={() => mutate()}
                />
            </AlertDialogContent>
        </AlertDialog>
    )
}
