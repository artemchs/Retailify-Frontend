import CashierShifts from '@/api/services/CashierShifts'
import PointsOfSale from '@/api/services/PointsOfSale'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CurrencyFormatter } from '@/components/ui/units'
import CashierOrdersDialog from '@/features/orders/CashierOrdersDialog'
import CloseCashierShiftAlertDialog from '@/features/points-of-sale/cashier-shifts/components/actions/close/CloseCashierShiftAlertDialog'
import CreateCashierShiftDialog from '@/features/points-of-sale/cashier-shifts/components/actions/create/CreateCashierShiftDialog'
import DepositCashierShiftDialog from '@/features/points-of-sale/cashier-shifts/components/actions/deposit/DepositCashierShiftDialog'
import WithdrawalCashierShiftDialog from '@/features/points-of-sale/cashier-shifts/components/actions/withdrawal/WithdrawalCashierShiftDialog'
import CashierRefundsDialog from '@/features/refunds/components/shared/CashierRefundsDialog'
import { cashRegisterRoute } from '@/lib/router/routeTree'
import { cn } from '@/lib/utils'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { useNavigate } from '@tanstack/react-router'
import {
  ArrowDown,
  ArrowUp,
  BanIcon,
  CheckCircle2,
  DollarSign,
  Loader2,
  Minus,
  Plus,
  Undo2,
  XCircle,
} from 'lucide-react'
import { useEffect, useState } from 'react'

export default function CurrentShiftDropdown({
  shiftId,
  posId,
}: {
  shiftId?: string
  posId: string
}) {
  const { data, isLoading, isError } = CashierShifts.useFindOne({
    id: shiftId,
    posId,
  })
  const pos = PointsOfSale.useFindOne({ id: posId })

  const navigate = useNavigate({
    from: cashRegisterRoute.id,
  })

  function setShiftId(id: string) {
    navigate({
      search: (prev) => ({ ...prev, shiftId: id }),
    })
  }

  const [
    isCreateCashierShiftDialogOpened,
    setIsCreateCashierShiftDialogOpened,
  ] = useState(false)
  const [isCloseCashierShiftDialogOpened, setIsCloseCashierShiftDialogOpened] =
    useState(false)
  const [
    isDepositCashierShiftDialogOpened,
    setIsDepositCashierShiftDialogOpened,
  ] = useState(false)
  const [
    isWithdrawalCashierShiftDialogOpened,
    setIsWithdrawalCashierShiftDialogOpened,
  ] = useState(false)
  const [isOrdersOpened, setIsOrdersOpened] = useState(false)
  const [isRefundsOpened, setIsRefundsOpened] = useState(false)

  useEffect(() => {
    if (!shiftId) {
      setIsCreateCashierShiftDialogOpened(true)
    }
  }, [shiftId, setIsCreateCashierShiftDialogOpened, data])

  const isShiftOpened = Boolean(shiftId && data?.isOpened)

  function ShiftStatusIcon({ className }: { className: string }) {
    return isLoading ? (
      <Loader2 className={cn('animate-spin', className)} />
    ) : !shiftId || !data?.isOpened ? (
      <Minus className={cn('opacity-50 shrink-0', className)} />
    ) : isError ? (
      <XCircle className={cn('text-destructive shrink-0', className)} />
    ) : (
      <CheckCircle2 className={cn('text-green-600 shrink-0', className)} />
    )
  }

  return (
    <>
      <CreateCashierShiftDialog
        posId={posId}
        isCreateCashierShiftDialogOpened={isCreateCashierShiftDialogOpened}
        setIsCreateCashierShiftDialogOpened={
          setIsCreateCashierShiftDialogOpened
        }
        setShiftId={setShiftId}
      />
      {shiftId && (
        <>
          <CashierOrdersDialog
            isOpenedCustom={isOrdersOpened}
            setIsOpenedCustom={setIsOrdersOpened}
          />
          <CashierRefundsDialog
            isOpenedCustom={isRefundsOpened}
            setIsOpenedCustom={setIsRefundsOpened}
          />
          <WithdrawalCashierShiftDialog
            posId={posId}
            shiftId={shiftId}
            isOpenedCustom={isWithdrawalCashierShiftDialogOpened}
            setIsOpenedCustom={setIsWithdrawalCashierShiftDialogOpened}
          />
          <DepositCashierShiftDialog
            posId={posId}
            shiftId={shiftId}
            isOpenedCustom={isDepositCashierShiftDialogOpened}
            setIsOpenedCustom={setIsDepositCashierShiftDialogOpened}
          />
          <CloseCashierShiftAlertDialog
            isCloseCashierShiftDialogOpened={isCloseCashierShiftDialogOpened}
            setIsCloseCashierShiftDialogOpened={
              setIsCloseCashierShiftDialogOpened
            }
            id={shiftId}
            posId={posId}
          />
        </>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' type='button' role='combobox'>
            <ShiftStatusIcon className='h-4 w-4 mr-2' />
            Моя смена
            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium'>
                Средств:{' '}
                {pos.isLoading
                  ? 'Загрузка...'
                  : pos.isError
                  ? 'Ошибка'
                  : pos.data && (
                      <CurrencyFormatter value={Number(pos.data.balance)} />
                    )}
              </p>
              <div className='text-xs leading-none flex items-center gap-1'>
                <ShiftStatusIcon className='h-3 w-3' />
                {isLoading ? (
                  <p>Загрузка...</p>
                ) : !shiftId || !data?.isOpened ? (
                  <p className='opacity-50'>Смена закрыта</p>
                ) : isError ? (
                  <p className='text-destructive'>Ошибка</p>
                ) : (
                  <p className='text-green-600'>Смена открыта</p>
                )}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={isShiftOpened}
            onClick={() => setIsCreateCashierShiftDialogOpened(true)}
          >
            <Plus className='h-4 w-4 mr-2' />
            Открыть новую смену
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!isShiftOpened}
            onClick={() => setIsCloseCashierShiftDialogOpened(true)}
          >
            <BanIcon className='h-4 w-4 mr-2' />
            Закрыть смену
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={!isShiftOpened}
            onClick={() => setIsDepositCashierShiftDialogOpened(true)}
          >
            <ArrowDown className='h-4 w-4 mr-2 text-green-600' />
            Внесение средств
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!isShiftOpened}
            onClick={() => setIsWithdrawalCashierShiftDialogOpened(true)}
          >
            <ArrowUp className='h-4 w-4 mr-2 text-destructive' />
            Изъятие средств
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={!isShiftOpened}
            onClick={() => setIsOrdersOpened(true)}
          >
            <DollarSign className='h-4 w-4 mr-2' />
            Продажи
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!isShiftOpened}
            onClick={() => setIsRefundsOpened(true)}
          >
            <Undo2 className='h-4 w-4 mr-2' />
            Возвраты
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
