import UserInfo from '@/components/nav/UserInfo'
import { Button } from '@/components/ui/button'
import CashRegisterForm from '@/features/cash-register/components/CashRegisterForm'
import CurrentShiftDropdown from '@/features/cash-register/components/CurrentShiftDropdown'
import { cashRegisterRoute } from '@/lib/router/routeTree'
import { VariantWithProduct } from '@/types/entities/Variant'
import { Link, useSearch } from '@tanstack/react-router'
import { RowSelectionState } from '@tanstack/react-table'
import { Home } from 'lucide-react'

export interface VariantWithProductWithQuantity extends VariantWithProduct {
  quantity?: number
}

export type CashRegisterSelectedProductState = {
  selectedProducts: VariantWithProductWithQuantity[]
  setSelectedProducts: React.Dispatch<
    React.SetStateAction<VariantWithProductWithQuantity[]>
  >
}

export type CashRegisterRowSelectionState = {
  rowSelection: RowSelectionState
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>
}

export default function CashRegisterPage() {
  const { shiftId, posId } = useSearch({
    from: cashRegisterRoute.id,
  })

  return (
    <div className='flex flex-col h-screen'>
      <div className='h-16 px-4 shrink-0 sticky top-0 w-full border border-b border-input bg-background flex items-center justify-between z-50'>
        <div className='flex items-center gap-4'>
          <Button size='icon' variant='outline' asChild>
            <Link to='/'>
              <Home className='h-4 w-4' />
            </Link>
          </Button>
          <UserInfo />
        </div>
        <CurrentShiftDropdown shiftId={shiftId} posId={posId} />
      </div>
      {shiftId && <CashRegisterForm posId={posId} shiftId={shiftId} />}
    </div>
  )
}
