import { Outlet } from '@tanstack/react-router'
import { AppProvider } from './providers/AppProvider'
import './assets/index.css'

export default function App() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  )
}
