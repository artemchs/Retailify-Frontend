import { Outlet } from '@tanstack/react-router'
import { AppProvider } from './providers/AppProvider'

export default function App() {
  return (
    <AppProvider>
      <div className='bg-background text-foreground'>
        <Outlet />
      </div>
    </AppProvider>
  )
}
