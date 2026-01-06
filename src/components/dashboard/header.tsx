'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, User } from 'lucide-react';

export function DashboardHeader() {
  const { data: session } = useSession();
  const router = useRouter();

  // Calculate user initials from name
  const userInitials = session?.user?.name
    ? session.user.name
        .split(' ')
        .map((word) => word.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'US';

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <header className="border-b bg-white sticky top-0 z-40 h-16 px-6 flex items-center justify-between">
      {/* Logo and Title */}
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">AE</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900">APEX ERP</h1>
      </div>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
              <AvatarFallback className="bg-red-600 text-white">{userInitials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-slate-900">
                {session?.user?.name || 'Usuário'}
              </p>
              <p className="text-xs leading-none text-slate-500">{session?.user?.email || ''}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-slate-600 hover:text-slate-900">
            <User className="mr-2 h-4 w-4" />
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem className="text-slate-600 hover:text-slate-900">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
