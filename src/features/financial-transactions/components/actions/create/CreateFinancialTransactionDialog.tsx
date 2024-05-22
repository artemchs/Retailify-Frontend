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

export default function CreateFinancialTransactionDialog() {
    const [isOpened, setIsOpened] = useState(false)

    return (
        <Dialog open={isOpened} onOpenChange={setIsOpened}>
            <DialogTrigger asChild>
                <Button size='sm' variant='secondary' className='w-full'>
                    <Plus className='h-4 w-4 mr-2' />
                    Создать транзакцию
                </Button>
            </DialogTrigger>
            <DialogContent className='max-h-[90%] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle>
                        Создать новую финансовую транзакцию
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
