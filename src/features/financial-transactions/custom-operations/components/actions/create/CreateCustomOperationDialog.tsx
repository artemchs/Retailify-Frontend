import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import CreateCustomOperationForm from './CreateCustomOperationForm'

export type CreateCustomOperationDialogProps = {
    selectedValue?: string
    setSelectedValue?: (newValue: string) => void
}

export default function CreateCustomOperationDialog({
    selectedValue,
    setSelectedValue,
}: CreateCustomOperationDialogProps) {
    const [isOpened, setIsOpened] = useState(false)

    return (
        <Dialog open={isOpened} onOpenChange={setIsOpened}>
            <DialogTrigger asChild>
                <Button size='sm' variant='secondary' className='w-full'>
                    <Plus className='h-4 w-4 mr-2' />
                    Добавить операцию
                </Button>
            </DialogTrigger>
            <DialogContent className='max-h-[90%] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle>
                        Добавить пользовательскую операцию
                    </DialogTitle>
                </DialogHeader>
                <CreateCustomOperationForm
                    setIsOpened={setIsOpened}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                />
            </DialogContent>
        </Dialog>
    )
}
