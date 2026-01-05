import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LogoutButton } from '@/components/auth/logout-button'

export const metadata: Metadata = {
  title: 'Dashboard - APEX ERP',
  description: 'Painel de controle do sistema APEX ERP',
}

export default async function DashboardPage() {
  const session = await auth()

  // Se o usuário não está autenticado, redireciona para o login
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="mx-auto max-w-4xl p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-linear-to-r from-red-600 to-slate-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-lg text-slate-600">
            Bem-vindo ao APEX ERP, {session.user?.name}!
          </p>
        </div>

        {/* Card de informações do usuário */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Informações da Conta</CardTitle>
            <CardDescription>
              Dados do seu perfil no sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">Email</p>
                <p className="text-base font-medium">{session.user?.email}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">Nome</p>
                <p className="text-base font-medium">{session.user?.name}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">Papel</p>
                <Badge
                  variant={
                    session.user?.role === 'ADMIN' ? 'default' : 'secondary'
                  }
                  className="text-sm"
                >
                  {session.user?.role}
                </Badge>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">Empresa</p>
                <p className="text-base font-medium">
                  {session.user?.tenantName}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <LogoutButton />
            </div>
          </CardContent>
        </Card>

        {/* Card de boas-vindas */}
        <Card className="shadow-lg border-0 bg-linear-to-br from-red-50 to-slate-50">
          <CardHeader>
            <CardTitle className="text-xl">🎉 Sistema em Funcionamento!</CardTitle>
            <CardDescription>
              A autenticação está configurada e funcionando perfeitamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">
              Você está vendo esta página porque o sistema de autenticação com
              NextAuth.js foi configurado corretamente. A partir daqui você pode
              começar a desenvolver as funcionalidades do seu ERP.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
