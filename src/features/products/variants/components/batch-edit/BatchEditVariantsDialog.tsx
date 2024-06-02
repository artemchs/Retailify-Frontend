import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import BatchEditVariantsForm from './BatchEditVariantsForm'

export interface BatchEditVariantsDialogProps {
    ids: string[]
}

const BatchEditVariantsDialog = ({ ids }: BatchEditVariantsDialogProps) => {
    const [isOpened, setIsOpened] = useState(false)

    return (
        <Dialog onOpenChange={setIsOpened} open={isOpened}>
            <DialogTrigger asChild>
                <Button size='icon'>
                    <Edit className='h-4 w-4' />
                </Button>
            </DialogTrigger>
            <DialogContent className='max-h-[90%] overflow-auto max-w-screen-xl'>
                <DialogHeader>
                    <DialogTitle>
                        Массовое редактирование вариантов товара
                    </DialogTitle>
                </DialogHeader>
                <BatchEditVariantsForm ids={ids} setIsOpened={setIsOpened} />
            </DialogContent>
        </Dialog>
    )
}

export default BatchEditVariantsDialog
