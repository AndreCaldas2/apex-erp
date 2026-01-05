'use client'

import { useState } from 'react'
import { useRedisCache } from '@/hooks/useRedisCache'
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
import { AlertCircle, Loader2, Trash2 } from 'lucide-react'

export default function RedisDemo() {
  const [cacheKey, setCacheKey] = useState('teste-key')
  const [cacheValue, setCacheValue] = useState('Olá, Redis!')
  const [cacheTTL, setCacheTTL] = useState(300)
  const [retrievedValue, setRetrievedValue] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const { setCache, getCache, deleteCache, clearAll } = useRedisCache()

  const handleSetCache = async () => {
    setLoading(true)
    setMessage(null)
    try {
      const success = await setCache(cacheKey, cacheValue, cacheTTL)
      if (success) {
        setMessage({
          type: 'success',
          text: `✅ Cache armazenado com sucesso! Key: ${cacheKey}, TTL: ${cacheTTL}s`,
        })
      } else {
        setMessage({
          type: 'error',
          text: '❌ Erro ao armazenar cache',
        })
      }
    } catch {
      setMessage({
        type: 'error',
        text: '❌ Erro ao armazenar cache',
      })
    }
    setLoading(false)
  }

  const handleGetCache = async () => {
    setLoading(true)
    setMessage(null)
    setRetrievedValue(null)
    try {
      const value = await getCache<string>(cacheKey)
      if (value !== null) {
        setRetrievedValue(value)
        setMessage({
          type: 'success',
          text: `✅ Cache recuperado com sucesso!`,
        })
      } else {
        setMessage({
          type: 'error',
          text: `❌ Cache não encontrado para a key: ${cacheKey}`,
        })
      }
    } catch {
      setMessage({
        type: 'error',
        text: '❌ Erro ao recuperar cache',
      })
    }
    setLoading(false)
  }

  const handleDeleteCache = async () => {
    setLoading(true)
    setMessage(null)
    try {
      const success = await deleteCache(cacheKey)
      if (success) {
        setRetrievedValue(null)
        setMessage({
          type: 'success',
          text: `✅ Cache deletado com sucesso! Key: ${cacheKey}`,
        })
      } else {
        setMessage({
          type: 'error',
          text: `❌ Cache não encontrado para deletar: ${cacheKey}`,
        })
      }
    } catch {
      setMessage({
        type: 'error',
        text: '❌ Erro ao deletar cache',
      })
    }
    setLoading(false)
  }

  const handleClearAll = async () => {
    setLoading(true)
    setMessage(null)
    try {
      const success = await clearAll()
      if (success) {
        setRetrievedValue(null)
        setMessage({
          type: 'success',
          text: '✅ Todo o cache foi limpo com sucesso!',
        })
      } else {
        setMessage({
          type: 'error',
          text: '❌ Erro ao limpar cache',
        })
      }
    } catch {
      setMessage({
        type: 'error',
        text: '❌ Erro ao limpar cache',
      })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">
            Redis Cache Demo
          </h1>
          <p className="text-lg text-slate-600">
            Armazenamento em cache de alta performance com Redis
          </p>
        </div>

        {/* Info sobre Redis */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Redis está rodando em localhost:6379. Teste as operações de cache
            abaixo e veja a diferença de performance!
          </AlertDescription>
        </Alert>

        {/* Mensagem de feedback */}
        {message && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {/* Card de Operações de Cache */}
        <Card>
          <CardHeader>
            <CardTitle>Operações de Cache</CardTitle>
            <CardDescription>
              Teste as operações de armazenamento, recuperação e exclusão
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cache-key">Cache Key</Label>
                <Input
                  id="cache-key"
                  value={cacheKey}
                  onChange={(e) => setCacheKey(e.target.value)}
                  placeholder="minha-chave"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cache-value">Cache Value</Label>
                <Input
                  id="cache-value"
                  value={cacheValue}
                  onChange={(e) => setCacheValue(e.target.value)}
                  placeholder="Meu valor"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cache-ttl">TTL (segundos)</Label>
                <Input
                  id="cache-ttl"
                  type="number"
                  value={cacheTTL}
                  onChange={(e) => setCacheTTL(Number(e.target.value))}
                  placeholder="300"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleSetCache}
                disabled={loading || !cacheKey || !cacheValue}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Armazenar'
                )}
              </Button>

              <Button
                onClick={handleGetCache}
                variant="secondary"
                disabled={loading || !cacheKey}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Recuperar'
                )}
              </Button>

              <Button
                onClick={handleDeleteCache}
                variant="outline"
                disabled={loading || !cacheKey}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Deletar
                  </>
                )}
              </Button>

              <Button
                onClick={handleClearAll}
                variant="destructive"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Limpar Tudo'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Card de Valor Recuperado */}
        {retrievedValue !== null && (
          <Card>
            <CardHeader>
              <CardTitle>Valor Recuperado</CardTitle>
              <CardDescription>Cache key: {cacheKey}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 rounded-lg p-4 font-mono">
                {retrievedValue}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Card de Casos de Uso */}
        <Card>
          <CardHeader>
            <CardTitle>Casos de Uso do Redis no APEX ERP</CardTitle>
            <CardDescription>
              Como o Redis melhora a performance do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge>Cache</Badge>
                </div>
                <p className="text-sm text-slate-600">
                  Armazena resultados de consultas frequentes ao banco de dados,
                  reduzindo latência de 50ms para 2ms
                </p>
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Sessões</Badge>
                </div>
                <p className="text-sm text-slate-600">
                  Gerencia sessões de usuários com expiração automática,
                  melhorando segurança e performance
                </p>
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Rate Limiting</Badge>
                </div>
                <p className="text-sm text-slate-600">
                  Controla taxa de requisições por usuário/IP, prevenindo abuso
                  e sobrecarga do sistema
                </p>
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">Filas</Badge>
                </div>
                <p className="text-sm text-slate-600">
                  Processa tarefas assíncronas como envio de emails, relatórios
                  e notificações em background
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card de Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Comparação de Performance</CardTitle>
            <CardDescription>
              Tempo médio de resposta por tipo de armazenamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">PostgreSQL (Banco de Dados)</p>
                  <p className="text-sm text-slate-500">Consulta direta</p>
                </div>
                <Badge variant="outline">~10-50ms</Badge>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Redis (Cache)</p>
                  <p className="text-sm text-slate-500">
                    Dados em memória
                  </p>
                </div>
                <Badge>~1-5ms</Badge>
              </div>

              <div className="bg-green-50 rounded-lg p-4 mt-4">
                <p className="text-sm font-medium text-green-900">
                  🚀 Melhoria de Performance: até 10x mais rápido!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
