import CashierShifts from '@/api/services/CashierShifts'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import CloseCashierShiftAlertDialog from '@/features/points-of-sale/cashier-shifts/components/actions/close/CloseCashierShiftAlertDialog'
import CreateCashierShiftDialog from '@/features/points-of-sale/cashier-shifts/components/actions/create/CreateCashierShiftDialog'
import DepositCashierShiftDialog from '@/features/points-of-sale/cashier-shifts/components/actions/deposit/DepositCashierShiftDialog'
import WithdrawalCashierShiftDialog from '@/features/points-of-sale/cashier-shifts/components/actions/withdrawal/WithdrawalCashierShiftDialog'
import { cashRegisterRoute } from '@/lib/router/routeTree'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { useNavigate } from '@tanstack/react-router'
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Loader2,
  Minus,
  Plus,
  StopCircle,
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

  useEffect(() => {
    if (!shiftId) {
      setIsCreateCashierShiftDialogOpened(true)
    }
  }, [shiftId, setIsCreateCashierShiftDialogOpened, data])

  const isShiftOpened = Boolean(shiftId && data?.isOpened)

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
        <CloseCashierShiftAlertDialog
          isCloseCashierShiftDialogOpened={isCloseCashierShiftDialogOpened}
          setIsCloseCashierShiftDialogOpened={
            setIsCloseCashierShiftDialogOpened
          }
          id={shiftId}
          posId={posId}
        />
      )}
      {shiftId && (
        <DepositCashierShiftDialog
          posId={posId}
          shiftId={shiftId}
          isOpenedCustom={isDepositCashierShiftDialogOpened}
          setIsOpenedCustom={setIsDepositCashierShiftDialogOpened}
        />
      )}
      {shiftId && (
        <WithdrawalCashierShiftDialog
          posId={posId}
          shiftId={shiftId}
          isOpenedCustom={isWithdrawalCashierShiftDialogOpened}
          setIsOpenedCustom={setIsWithdrawalCashierShiftDialogOpened}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' type='button' role='combobox'>
            {!data || !shiftId || !data.isOpened ? (
              <Minus className='opacity-50 h-4 w-4 mr-2 shrink-0' />
            ) : isLoading ? (
              <Loader2 className='h-4 w-4 mr-2 animate-spin' />
            ) : isError ? (
              <XCircle className='text-destructive h-4 w-4 mr-2 shrink-0' />
            ) : (
              <CheckCircle2 className='h-4 w-4 mr-2 text-green-600 shrink-0' />
            )}
            Моя смена
            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
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
            <StopCircle className='h-4 w-4 mr-2' />
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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
