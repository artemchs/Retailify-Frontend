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
import CreateProductImportForm from './CreateProductImportForm'

export default function CreateProductImportDialog() {
    const [isOpened, setIsOpened] = useState(false)

    return (
        <Dialog open={isOpened} onOpenChange={setIsOpened}>
            <DialogTrigger asChild>
                <Button size='sm' variant='secondary' className='w-full'>
                    <Plus className='h-4 w-4 mr-2' />
                    Импорт товара
                </Button>
            </DialogTrigger>
            <DialogContent className='max-h-[90%] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle>Создать импорт товара</DialogTitle>
                </DialogHeader>
                <CreateProductImportForm setIsOpened={setIsOpened} />
            </DialogContent>
        </Dialog>
    )
}
