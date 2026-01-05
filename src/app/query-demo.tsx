'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2 } from 'lucide-react';

// Tipos
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Conta {
  id: number;
  descricao: string;
  valor: number;
  status: 'PAGA' | 'PENDENTE';
}

// Função para buscar usuários (simulada)
async function fetchUsers(): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { id: 1, name: 'Admin User', email: 'admin@demo.com', role: 'ADMIN' },
    { id: 2, name: 'Financeiro User', email: 'financeiro@demo.com', role: 'FINANCEIRO' },
    { id: 3, name: 'João Silva', email: 'joao@demo.com', role: 'PROFISSIONAL' },
  ];
}

// Função para buscar contas (simulada)
async function fetchContas(): Promise<Conta[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [
    { id: 1, descricao: 'Aluguel - Janeiro', valor: 5000, status: 'PAGA' },
    { id: 2, descricao: 'Energia - Janeiro', valor: 800, status: 'PENDENTE' },
    { id: 3, descricao: 'Internet - Janeiro', valor: 200, status: 'PAGA' },
  ];
}

// Componente de Usuários
function UsersSection() {
  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Usuários</CardTitle>
          <CardDescription>Carregando dados...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-2 py-8">
            <Loader2 className="h-6 w-6 animate-spin text-slate-600" />
            <span className="text-slate-600">Carregando usuários...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Usuários</CardTitle>
          <CardDescription>Erro ao carregar dados</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Erro ao carregar usuários: {(error as Error).message}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usuários</CardTitle>
        <CardDescription>Lista de usuários do sistema</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {users?.map((user) => (
            <div key={user.id} className="flex items-center justify-between border rounded-lg p-4">
              <div className="space-y-1">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
              <Badge>{user.role}</Badge>
            </div>
          ))}
        </div>
        <Button onClick={() => refetch()} variant="outline" className="w-full">
          Recarregar
        </Button>
      </CardContent>
    </Card>
  );
}

// Componente de Contas
function ContasSection() {
  const {
    data: contas,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['contas'],
    queryFn: fetchContas,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contas</CardTitle>
          <CardDescription>Carregando dados...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-2 py-8">
            <Loader2 className="h-6 w-6 animate-spin text-slate-600" />
            <span className="text-slate-600">Carregando contas...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contas</CardTitle>
          <CardDescription>Erro ao carregar dados</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Erro ao carregar contas: {(error as Error).message}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contas</CardTitle>
        <CardDescription>Lista de contas a pagar/receber</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {contas?.map((conta) => (
            <div key={conta.id} className="flex items-center justify-between border rounded-lg p-4">
              <div className="space-y-1">
                <p className="font-medium">{conta.descricao}</p>
                <p className="text-sm text-slate-500">
                  R$ {conta.valor.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <Badge variant={conta.status === 'PAGA' ? 'default' : 'secondary'}>
                {conta.status}
              </Badge>
            </div>
          ))}
        </div>
        <Button onClick={() => refetch()} variant="outline" className="w-full">
          Recarregar
        </Button>
      </CardContent>
    </Card>
  );
}

// Componente Principal
export default function QueryDemo() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">TanStack Query Demo</h1>
          <p className="text-lg text-slate-600">
            Gerenciamento de estado assíncrono com cache inteligente
          </p>
        </div>

        {/* Info sobre cache */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Os dados são armazenados em cache por 5 minutos. Clique em &quot;Recarregar&quot; para
            testar - a segunda requisição será instantânea devido ao cache!
          </AlertDescription>
        </Alert>

        {/* Seção de Usuários */}
        <UsersSection />

        {/* Seção de Contas */}
        <ContasSection />
      </div>
    </div>
  );
}
