'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Loader2, LogOut } from 'lucide-react'

export default function AuthDemo() {
  const [email, setEmail] = useState('admin@demo.com')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const { session, user, isAuthenticated, isLoading, login, logout } =
    useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      await login(email, password)
      setMessage('✅ Login realizado com sucesso!')
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao fazer login'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    setMessage(null)
    try {
      await logout()
      setMessage('✅ Logout realizado com sucesso!')
    } catch {
      setError('Erro ao fazer logout')
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-slate-600" />
              <span className="text-slate-600">Carregando...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">
            NextAuth.js Demo
          </h1>
          <p className="text-lg text-slate-600">
            Autenticação segura com JWT e sessões
          </p>
        </div>

        {/* Info sobre NextAuth.js */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            NextAuth.js está configurado com CredentialsProvider, JWT sessions
            e callbacks customizados. Teste o login abaixo!
          </AlertDescription>
        </Alert>

        {/* Mensagens */}
        {message && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Formulário de Login ou Informações do Usuário */}
        {!isAuthenticated ? (
          <Card>
            <CardHeader>
              <CardTitle>Fazer Login</CardTitle>
              <CardDescription>
                Entre com suas credenciais para acessar o sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    disabled={loading}
                  />
                </div>

                <div className="bg-slate-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium text-slate-700">
                    Credenciais de Teste:
                  </p>
                  <p className="text-sm text-slate-600">
                    Email: admin@demo.com
                  </p>
                  <p className="text-sm text-slate-600">Senha: admin123</p>
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    'Fazer Login'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Informações do Usuário */}
            <Card>
              <CardHeader>
                <CardTitle>Usuário Autenticado</CardTitle>
                <CardDescription>
                  Você está logado no sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm font-medium text-slate-700">
                      Email
                    </span>
                    <span className="text-sm text-slate-600">
                      {user?.email}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm font-medium text-slate-700">
                      Nome
                    </span>
                    <span className="text-sm text-slate-600">
                      {user?.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm font-medium text-slate-700">
                      Papel
                    </span>
                    <Badge>{user?.role}</Badge>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm font-medium text-slate-700">
                      Empresa
                    </span>
                    <span className="text-sm text-slate-600">
                      {user?.tenantName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      Tenant ID
                    </span>
                    <span className="text-sm text-slate-600 font-mono">
                      {user?.tenantId}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saindo...
                    </>
                  ) : (
                    <>
                      <LogOut className="mr-2 h-4 w-4" />
                      Fazer Logout
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Informações da Sessão */}
            <Card>
              <CardHeader>
                <CardTitle>Informações da Sessão (JWT)</CardTitle>
                <CardDescription>
                  Dados armazenados no token JWT
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm">
                  {JSON.stringify(session, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </>
        )}

        {/* Card de Recursos */}
        <Card>
          <CardHeader>
            <CardTitle>Recursos Implementados</CardTitle>
            <CardDescription>
              Funcionalidades do NextAuth.js no APEX ERP
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 space-y-2">
                <Badge>CredentialsProvider</Badge>
                <p className="text-sm text-slate-600">
                  Autenticação com email e senha usando Prisma e bcrypt
                </p>
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <Badge variant="secondary">JWT Sessions</Badge>
                <p className="text-sm text-slate-600">
                  Sessões baseadas em JWT com TTL de 30 dias
                </p>
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <Badge variant="outline">Callbacks</Badge>
                <p className="text-sm text-slate-600">
                  Callbacks customizados para adicionar role e tenantId
                </p>
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <Badge variant="destructive">TypeScript</Badge>
                <p className="text-sm text-slate-600">
                  Tipos customizados para Session, User e JWT
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
