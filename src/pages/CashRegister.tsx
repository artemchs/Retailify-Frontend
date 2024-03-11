import UserInfo from '@/components/nav/UserInfo'
import { Button } from '@/components/ui/button'
import CheckoutZoneCashRegister from '@/features/cash-register/components/CheckoutZoneCashRegister'
import CurrentShiftDropdown from '@/features/cash-register/components/CurrentShiftDropdown'
import ProductsListCashRegister from '@/features/cash-register/components/ProductsListCashRegister'
import { cashRegisterRoute } from '@/lib/router/routeTree'
import { VariantWithProduct } from '@/types/entities/Variant'
import { Link, useSearch } from '@tanstack/react-router'
import { RowSelectionState } from '@tanstack/react-table'
import { Home } from 'lucide-react'
import { useState } from 'react'

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

  const [selectedProducts, setSelectedProducts] = useState<
    VariantWithProductWithQuantity[]
  >([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

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
      <div className='flex w-full p-4 gap-4 cashier-content-max-h overflow-y-auto flex-grow'>
        <div className='w-full max-h-full overflow-y-auto'>
          <ProductsListCashRegister
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        </div>
        <div className='w-2/5 max-h-full overflow-y-auto border-l border-input pl-4'>
          <CheckoutZoneCashRegister
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        </div>
      </div>
    </div>
  )
}
