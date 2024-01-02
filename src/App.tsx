import { AppProvider } from './providers/AppProvider'
import './assets/index.css'
import { Outlet } from '@tanstack/react-router'

export default function App() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  )
}
