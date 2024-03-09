import { useParams } from '@tanstack/react-router'
import CloseCashierShiftAlertDialog from '../actions/close/CloseCashierShiftAlertDialog'
import { pointOfSaleRoute } from '@/lib/router/routeTree'

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
        <CloseCashierShiftAlertDialog id={id} posId={pointOfSaleId} />
      )}
    </div>
  )
}
