import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

export default function CreateGoodsReceiptLink() {
  return (
    <Button asChild>
      <Link to='/goods-receipts/create'>
        <Plus className='h-4 w-4 mr-2' />
        Добавить накладную прихода
      </Link>
    </Button>
  )
}
