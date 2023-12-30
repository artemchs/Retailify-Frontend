import { useAuth } from '@/hooks/useAuth'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <div className='border-b p-3 w-full h-fit sticky top-0 bg-background'>
      <div className='h-9 flex items-center'>{user?.username}</div>
    </div>
  )
}
