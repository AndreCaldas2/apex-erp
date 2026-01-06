'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  DollarSign,
  Users,
  Package,
  BarChart3,
  Settings,
  ChevronRight,
} from 'lucide-react';

const menuItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Contas',
    href: '/contas',
    icon: DollarSign,
  },
  {
    label: 'Clientes',
    href: '/clientes',
    icon: Users,
  },
  {
    label: 'Produtos',
    href: '/produtos',
    icon: Package,
  },
  {
    label: 'Relatórios',
    href: '/relatorios',
    icon: BarChart3,
  },
  {
    label: 'Configurações',
    href: '/configuracoes',
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-slate-50 h-[calc(100vh-64px)] overflow-y-auto">
      <nav className="space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-red-100 text-red-600 font-medium'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="h-4 w-4" />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
