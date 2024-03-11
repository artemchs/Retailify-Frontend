import { useParams } from '@tanstack/react-router'
import CloseCashierShiftAlertDialog from '../actions/close/CloseCashierShiftAlertDialog'
import { pointOfSaleRoute } from '@/lib/router/routeTree'
import { AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { StopCircle } from 'lucide-react'

export default function CashierShiftActions({
  id,
  isOpened,
}: {
  id: string
  isOpened: boolean
}) {
  const { pointOfSaleId } = useParams({
    from: pointOfSaleRoute.id,
  })

  return (
    <div className='flex items-center gap-2 justify-end'>
      {isOpened && (
        <CloseCashierShiftAlertDialog
          id={id}
          posId={pointOfSaleId}
          trigger={
            <AlertDialogTrigger asChild>
              <Button size='icon' variant='secondary'>
                <StopCircle className='h-4 w-4' />
              </Button>
            </AlertDialogTrigger>
          }
        />
      )}
    </div>
  )
}
