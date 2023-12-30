import AuthBg from './AuthBg'
import { Outlet } from '@tanstack/react-router'

export default function AuthScreen() {
  return (
    <div className='grid lg:grid-cols-2 grid-rows-1'>
      <AuthBg />
      <div className='container flex justify-center items-center h-screen lg:max-w-lg'>
        <div className='flex flex-col space-y-6 w-full items-center'>
          <div className='w-full'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
