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
import CreateBrandForm from './CreateBrandForm'

export type CreateBrandDialogProps = {
  selectedValue?: string
  setSelectedValue?: (newValue: string) => void
}

export default function CreateBrandDialog({
  selectedValue,
  setSelectedValue,
}: CreateBrandDialogProps) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button size='sm' variant='secondary' className='w-full'>
          <Plus className='h-4 w-4 mr-2' />
          Добавить бренд
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить бренд</DialogTitle>
        </DialogHeader>
        <CreateBrandForm
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          setIsOpened={setIsOpened}
        />
      </DialogContent>
    </Dialog>
  )
}
