import Logo from '@/components/Logo'
import authBg from '@/assets/auth-bg.jpg'

export default function AuthBg() {
  return (
    <div className='hidden lg:flex border border-t-0 border-b-0 border-l-0 relative flex-col p-8'>
      <Logo className='text-white' />
      <img
        src={authBg}
        className='h-full w-full object-cover brightness-75 absolute top-0 left-0'
      />
    </div>
  )
}
