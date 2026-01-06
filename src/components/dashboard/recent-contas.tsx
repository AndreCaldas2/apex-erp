'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const recentContas = [
  {
    id: '1',
    descricao: 'Aluguel do Escritório',
    valor: 2500.0,
    status: 'PAGA' as const,
    data: new Date('2025-01-05'),
  },
  {
    id: '2',
    descricao: 'Pagamento Fornecedor XYZ',
    valor: 1200.5,
    status: 'PENDENTE' as const,
    data: new Date('2025-01-08'),
  },
  {
    id: '3',
    descricao: 'Energia Elétrica',
    valor: 380.75,
    status: 'PAGA' as const,
    data: new Date('2025-01-03'),
  },
  {
    id: '4',
    descricao: 'Internet e Telefone',
    valor: 150.0,
    status: 'PENDENTE' as const,
    data: new Date('2025-01-10'),
  },
  {
    id: '5',
    descricao: 'Material de Escritório',
    valor: 95.3,
    status: 'PAGA' as const,
    data: new Date('2025-01-02'),
  },
];

export function RecentContas() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-slate-900">Contas Recentes</CardTitle>
        <CardDescription className="text-slate-600">
          Últimas contas a pagar e receber
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-slate-600">Descrição</TableHead>
              <TableHead className="text-slate-600">Valor</TableHead>
              <TableHead className="text-slate-600">Status</TableHead>
              <TableHead className="text-slate-600">Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentContas.map((conta) => (
              <TableRow key={conta.id}>
                <TableCell className="font-medium text-slate-900">{conta.descricao}</TableCell>
                <TableCell className="text-slate-900">{formatCurrency(conta.valor)}</TableCell>
                <TableCell>
                  <Badge
                    variant={conta.status === 'PAGA' ? 'default' : 'secondary'}
                    className={
                      conta.status === 'PAGA'
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }
                  >
                    {conta.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600">{formatDate(conta.data)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
