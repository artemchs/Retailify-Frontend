import Employees from '@/api/services/Employees'
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
import EditEmployeeForm from './EditEmployeeForm'

export default function EditEmployeeDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = Employees.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button variant='secondary' size='sm'>
          <Edit className='h-4 w-4 mr-2' />
          Редактировать
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать сотрудника</DialogTitle>
        </DialogHeader>
        <EditEmployeeForm
          setIsOpened={setIsOpened}
          user={data}
          isLoading={isLoading}
          isError={isError}
        />
      </DialogContent>
    </Dialog>
  )
}
