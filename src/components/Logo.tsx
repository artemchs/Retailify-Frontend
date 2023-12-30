import { Store } from 'lucide-react'

type Props = {
  color: 'white' | 'primary' | 'secondary' | 'foreground'
}

export default function Logo({ color }: Props) {
  const textColor = `text-${color}`

  return (
    <div
      className={`flex z-20 items-center gap-2 text-lg font-medium ${textColor}`}
    >
      <Store className='h-6 w-6' />
      Retailify
    </div>
  )
}
