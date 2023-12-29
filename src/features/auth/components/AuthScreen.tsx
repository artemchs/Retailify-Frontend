import Logo from '@/components/Logo'
import React from 'react'
import authBg from '@/assets/auth-bg.jpg'

type Props = {
  title: string
  authForm: React.ReactNode
}

export default function AuthScreen({ title, authForm }: Props) {
  return (
    <div className='grid lg:grid-cols-2 grid-rows-1'>
      <div className='border border-t-0 border-b-0 border-l-0 relative flex flex-col p-8'>
        <Logo color='white' />
        <img
          src={authBg}
          className='h-full w-full object-cover brightness-75 absolute top-0 left-0'
        />
      </div>
      <div className='container flex justify-center items-center h-screen lg:max-w-lg'>
        <div className='flex flex-col space-y-6 w-full items-center'>
          <div className='flex flex-col space-y-2 items-center'>
            <Logo color='white' />
            <h1 className='text-2xl font-semibold tracking-tight'>{title}</h1>
          </div>
          <div className='w-full'>{authForm}</div>
        </div>
      </div>
    </div>
  )
}
