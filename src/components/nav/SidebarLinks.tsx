import { Link, useRouteContext } from '@tanstack/react-router'
import { Home, Users } from 'lucide-react'
import React from 'react'

export default function SidebarLinks() {
  return (
    <div className='flex flex-col gap-2'>
      <SidebarLink to='/' cashier={true} ecommerceManager={true}>
        <Home className='h-4 w-4' />
        Главная
      </SidebarLink>
      <SidebarLink to='/employees' cashier={false} ecommerceManager={false}>
        <Users className='h-4 w-4' />
        Сотрудники
      </SidebarLink>
    </div>
  )
}

function SidebarLink({
  children,
  to,
  cashier,
  ecommerceManager,
}: {
  children: React.ReactNode
  to: string
  cashier: boolean
  ecommerceManager: boolean
}) {
  const { user } = useRouteContext({ from: '/layout' })
  const handleClose = () => {
    const button = document.getElementById('sheet-close-button')
    if (button) {
      button.click()
    }
  }

  function canDisplay() {
    if (user?.role === 'ADMIN') {
      return true
    } else if (user?.role === 'CASHIER' && cashier) {
      return true
    } else if (user?.role === 'ECOMMERCE_MANAGER' && ecommerceManager) {
      return true
    } else {
      return false
    }
  }

  if (canDisplay()) {
    return (
      <Link
        to={to}
        activeProps={{
          className: 'bg-primary text-white',
        }}
        inactiveProps={{
          className: 'hover:bg-secondary',
        }}
        className='flex gap-2 items-center px-3 py-2 rounded-lg transition-colors'
        onClick={handleClose}
      >
        {children}
      </Link>
    )
  } else {
    return null
  }
}
