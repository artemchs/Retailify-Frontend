import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PackagePlus } from 'lucide-react'
import { useState } from 'react'

export default function CreateGoodsReceiptDialog() {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button>
          <PackagePlus className='h-4 w-4 mr-2' />
          Новый приход
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новый приход</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
