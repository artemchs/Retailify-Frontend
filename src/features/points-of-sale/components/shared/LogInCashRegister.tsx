import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { LogIn } from 'lucide-react'

type Props = {
  posId: string
  shiftId?: string
  size?: 'sm' | 'default'
  customText?: string
}

export default function LogInCashRegister({
  posId,
  shiftId,
  size,
  customText,
}: Props) {
  return (
    <Button asChild variant='outline' size={size ?? 'default'}>
      <Link
        to='/cash-register'
        search={{ page: 1, posId, shiftId, rowsPerPage: 20 }}
      >
        <LogIn className='h-4 w-4 mr-2' />
        {customText ?? 'Открыть кассу'}
      </Link>
    </Button>
  )
}
