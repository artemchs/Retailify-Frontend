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
import CreateVariantAdditionalAttributeForm from './CreateVariantAdditionalAttributeForm'

export type CreateVariantAdditionalAttributeDialog = {
  selectedValue?: string
  setSelectedValue?: (newValue?: string) => void
}

export default function CreateVariantAdditionalAttributeDialog({
  selectedValue,
  setSelectedValue,
}: CreateVariantAdditionalAttributeDialog) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button size='sm' variant='secondary' className='w-full'>
          <Plus className='h-4 w-4 mr-2' />
          Добавить аттрибут
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить дополнительный атрибут варианта</DialogTitle>
        </DialogHeader>
        <CreateVariantAdditionalAttributeForm
          setIsOpened={setIsOpened}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </DialogContent>
    </Dialog>
  )
}
