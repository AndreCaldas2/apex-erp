'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function LoginError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Erro na página de login:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold bg-linear-to-r from-red-600 to-slate-600 bg-clip-text text-transparent">
            Erro no Login
          </CardTitle>
          <CardDescription className="text-base">
            Ocorreu um erro ao carregar a página de login
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error.message || 'Erro desconhecido. Por favor, tente novamente.'}
            </AlertDescription>
          </Alert>

          <Button
            onClick={reset}
            className="w-full h-11 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Tentar Novamente
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
