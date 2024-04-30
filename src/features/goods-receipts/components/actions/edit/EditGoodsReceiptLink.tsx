import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { Edit } from 'lucide-react'

export default function EditGoodsReceiptLink({ id }: { id: string }) {
  return (
    <Button asChild variant='ghost' size='icon'>
      <Link
        to='/goods-receipts/$goodsReceiptId/edit'
        params={{ goodsReceiptId: id }}
      >
        <Edit className='h-4 w-4' />
      </Link>
    </Button>
  )
}
