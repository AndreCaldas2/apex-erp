import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Login - APEX ERP',
  description: 'Faça login para acessar o sistema APEX ERP',
}

export default async function LoginPage() {
  const session = await auth()

  // Se o usuário já está autenticado, redireciona para o dashboard
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </div>
  )
}
