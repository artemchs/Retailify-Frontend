import ImportSource from '@/api/services/ImportSource'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import EditImportSourceForm from './EditImportSourceForm'

export default function EditImportSourceDialog({ id }: { id: string }) {
    const [isOpened, setIsOpened] = useState(false)
    const { data, isLoading, isError } = ImportSource.useFindOne({ id })

    return (
        <Dialog open={isOpened} onOpenChange={setIsOpened}>
            <DialogTrigger asChild>
                <button>
                    <Edit className='h-4 w-4' />
                </button>
            </DialogTrigger>
            <DialogContent className='max-h-[90%] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle>Редактирование источника импорта</DialogTitle>
                </DialogHeader>
                <EditImportSourceForm
                    data={data ?? undefined}
                    id={id}
                    isError={isError}
                    isLoading={isLoading}
                    setIsOpened={setIsOpened}
                />
            </DialogContent>
        </Dialog>
    )
}
