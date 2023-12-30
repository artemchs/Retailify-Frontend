import { Store } from 'lucide-react'

type Props = {
  className: string
}

export default function Logo({ className }: Props) {
  return (
    <div
      className={`flex z-20 items-center gap-2 text-lg font-medium ${className}`}
    >
      <Store className='h-6 w-6' />
      Retailify
    </div>
  )
}
