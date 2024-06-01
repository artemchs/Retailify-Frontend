import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Edit } from 'lucide-react'
import BatchEditProductsForm from './BatchEditProductsForm'
import { useState } from 'react'

export interface BatchEditProductsDialogProps {
    ids: string[]
}

const BatchEditProductsDialog = ({ ids }: BatchEditProductsDialogProps) => {
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
                        Массовое редактирование моделей товара
                    </DialogTitle>
                </DialogHeader>
                <BatchEditProductsForm ids={ids} setIsOpened={setIsOpened} />
            </DialogContent>
        </Dialog>
    )
}

export default BatchEditProductsDialog
