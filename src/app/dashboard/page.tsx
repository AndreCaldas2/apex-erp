import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { StatCard } from '@/components/dashboard/stat-card';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { RecentContas } from '@/components/dashboard/recent-contas';
import { DollarSign, Users, Package, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard - APEX ERP',
  description: 'Painel de controle principal do sistema APEX ERP',
};

export default async function DashboardPage() {
  const session = await auth();

  // Se o usuário não está autenticado, redireciona para o login
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-8">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-900">Bem-vindo ao Dashboard</h1>
              <p className="text-slate-600">
                Aqui está um resumo das suas atividades e métricas importantes.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total de Contas"
                value="R$ 15.230"
                description="Contas a pagar e receber"
                icon={DollarSign}
                trend={{ value: 12, isPositive: true }}
              />
              <StatCard
                title="Total de Clientes"
                value="248"
                description="Clientes cadastrados"
                icon={Users}
                trend={{ value: 8, isPositive: true }}
              />
              <StatCard
                title="Total de Produtos"
                value="1.240"
                description="Produtos no estoque"
                icon={Package}
                trend={{ value: 5, isPositive: false }}
              />
              <StatCard
                title="Receita do Mês"
                value="R$ 45.231"
                description="Receita atual"
                icon={TrendingUp}
                trend={{ value: 23, isPositive: true }}
              />
            </div>

            {/* Charts and Tables */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Revenue Chart - spans 2 columns */}
              <div className="lg:col-span-2">
                <RevenueChart />
              </div>

              {/* Recent Accounts */}
              <div className="lg:col-span-1">
                <RecentContas />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
