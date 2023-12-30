import Settings from './Settings'
import UserInfo from './UserInfo'

export default function Navbar() {
  return (
    <div className='border-b p-3 w-full h-fit sticky top-0 bg-background'>
      <div className='h-9 flex items-center justify-between'>
        <UserInfo />
        <Settings />
      </div>
    </div>
  )
}
