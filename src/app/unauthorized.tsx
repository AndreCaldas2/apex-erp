import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Acesso Negado - APEX ERP',
  description: 'Você não tem permissão para acessar esta página',
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-destructive">Acesso Negado</CardTitle>
          <CardDescription>Você não tem permissão para acessar esta página</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Se você acredita que isto é um erro, entre em contato com o administrador.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Link href="/login" className="flex-1">
              <Button className="w-full">Fazer Login</Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Voltar para Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
