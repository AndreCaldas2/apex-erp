'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Lock, Unlock } from 'lucide-react';
import Link from 'next/link';

const publicRoutes = [
  { path: '/', name: 'Home' },
  { path: '/login', name: 'Login' },
  { path: '/api/health', name: 'Health Check' },
];

const privateRoutes = [
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/contas', name: 'Contas' },
  { path: '/clientes', name: 'Clientes' },
  { path: '/fornecedores', name: 'Fornecedores' },
  { path: '/produtos', name: 'Produtos' },
  { path: '/relatorios', name: 'Relatórios' },
  { path: '/configuracoes', name: 'Configurações' },
];

export default function MiddlewareDemo() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const isAuthenticated = status === 'authenticated';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">Middleware de Autenticação</h1>
          <p className="text-slate-600">Demonstração de proteção de rotas com NextAuth.js</p>
        </div>

        {/* Info Alert */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Este middleware intercepta todas as requisições e verifica se o usuário está
            autenticado. Rotas privadas redirecionam para /login se não autenticado.
          </AlertDescription>
        </Alert>

        {/* Authentication Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status de Autenticação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Status:</span>
              <Badge
                variant={isAuthenticated ? 'default' : 'secondary'}
                className="text-base py-1 px-3"
              >
                {isAuthenticated ? 'Autenticado' : 'Não Autenticado'}
              </Badge>
            </div>
            {isAuthenticated && session?.user && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Email:</span>
                  <span className="font-medium">{session.user.email}</span>
                </div>
                {session.user.role && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Papel:</span>
                    <span className="font-medium">{session.user.role}</span>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Public Routes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Unlock className="h-5 w-5 text-green-600" />
              Rotas Públicas
            </CardTitle>
            <CardDescription>Estas rotas são acessíveis para todos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {publicRoutes.map((route) => (
                <Button
                  key={route.path}
                  variant="outline"
                  className="w-full"
                  onClick={() => handleNavigate(route.path)}
                >
                  {route.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Private Routes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-red-600" />
              Rotas Privadas
            </CardTitle>
            <CardDescription>Estas rotas requerem autenticação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isAuthenticated && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Faça login para acessar rotas privadas. Você será redirecionado automaticamente
                  para /login ao tentar acessar uma rota protegida.
                </AlertDescription>
              </Alert>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {privateRoutes.map((route) => (
                <Button
                  key={route.path}
                  variant={isAuthenticated ? 'default' : 'secondary'}
                  className="w-full"
                  disabled={!isAuthenticated}
                  onClick={() => handleNavigate(route.path)}
                >
                  {route.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>Como Funciona</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 list-decimal list-inside">
              <li className="text-slate-700">
                <strong>Usuário não autenticado:</strong> Tenta acessar rota privada → middleware
                redireciona para /login com callbackUrl
              </li>
              <li className="text-slate-700">
                <strong>Usuário faz login:</strong> Envia credenciais → NextAuth cria token na
                sessão
              </li>
              <li className="text-slate-700">
                <strong>Usuário autenticado:</strong> Middleware verifica token → permite acesso a
                rotas privadas
              </li>
              <li className="text-slate-700">
                <strong>Usuário faz logout:</strong> Token é removido → próximas requisições
                redirecionam para login
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex gap-2">
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full">
              Voltar para Home
            </Button>
          </Link>
          {isAuthenticated && (
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full">Ir para Dashboard</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
