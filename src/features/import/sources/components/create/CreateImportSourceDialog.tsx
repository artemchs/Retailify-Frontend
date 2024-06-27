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
import CreateImportSourceForm from './CreateImportSourceForm'

export type CreateImportSourceDialogProps = {
    selectedValue?: string
    setSelectedValue?: (newValue: string) => void
}

export default function CreateImportSourceDialog({
    selectedValue,
    setSelectedValue,
}: CreateImportSourceDialogProps) {
    const [isOpened, setIsOpened] = useState(false)

    return (
        <Dialog open={isOpened} onOpenChange={setIsOpened}>
            <DialogTrigger asChild>
                <Button size='sm' variant='secondary' className='w-full'>
                    <Plus className='h-4 w-4 mr-2' />
                    Добавить источник
                </Button>
            </DialogTrigger>
            <DialogContent className='max-h-[90%] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle>Добавить источник импорта</DialogTitle>
                </DialogHeader>
                <CreateImportSourceForm
                    setIsOpened={setIsOpened}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                />
            </DialogContent>
        </Dialog>
    )
}
