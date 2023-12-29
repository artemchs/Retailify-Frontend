import AuthScreen from '@/features/auth/components/AuthScreen'
import LogInForm from '@/features/auth/log-in/LogInForm'

export function LogInPage() {
  return <AuthScreen title='Войти в акканут' authForm={<LogInForm />} />
}
