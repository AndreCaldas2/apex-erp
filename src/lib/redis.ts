import Redis from 'ioredis'

// Singleton pattern para instância Redis
let redis: Redis | null = null

function getRedis(): Redis {
  if (!redis) {
    redis = new Redis({
      host: 'localhost',
      port: 6379,
      maxRetriesPerRequest: null,
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000)
        return delay
      },
    })

    // Event listeners
    redis.on('connect', () => {
      console.log('✅ Redis conectado com sucesso')
    })

    redis.on('error', (error) => {
      console.error('❌ Erro no Redis:', error.message)
    })

    redis.on('close', () => {
      console.log('⚠️  Conexão Redis fechada')
    })
  }

  return redis
}

// Exportar instância
export const redisClient = getRedis()
export default redisClient

// Função para armazenar cache
export async function setCache<T>(
  key: string,
  value: T,
  ttl: number = 300
): Promise<boolean> {
  try {
    const serialized = JSON.stringify(value)
    await redisClient.setex(key, ttl, serialized)
    console.log(`📦 Cache armazenado: ${key} (TTL: ${ttl}s)`)
    return true
  } catch (error) {
    console.error(`❌ Erro ao armazenar cache ${key}:`, error)
    return false
  }
}

// Função para recuperar cache
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const value = await redisClient.get(key)
    if (!value) {
      console.log(`📭 Cache não encontrado: ${key}`)
      return null
    }
    console.log(`📬 Cache recuperado: ${key}`)
    return JSON.parse(value) as T
  } catch (error) {
    console.error(`❌ Erro ao recuperar cache ${key}:`, error)
    return null
  }
}

// Função para deletar cache
export async function deleteCache(key: string): Promise<boolean> {
  try {
    const result = await redisClient.del(key)
    if (result > 0) {
      console.log(`🗑️  Cache deletado: ${key}`)
      return true
    }
    console.log(`⚠️  Cache não encontrado para deletar: ${key}`)
    return false
  } catch (error) {
    console.error(`❌ Erro ao deletar cache ${key}:`, error)
    return false
  }
}

// Função para deletar múltiplos caches
export async function deleteCacheMultiple(keys: string[]): Promise<number> {
  try {
    if (keys.length === 0) return 0
    const result = await redisClient.del(...keys)
    console.log(`🗑️  ${result} cache(s) deletado(s)`)
    return result
  } catch (error) {
    console.error('❌ Erro ao deletar múltiplos caches:', error)
    return 0
  }
}

// Função para obter TTL de um cache
export async function getCacheTTL(key: string): Promise<number> {
  try {
    const ttl = await redisClient.ttl(key)
    return ttl
  } catch (error) {
    console.error(`❌ Erro ao obter TTL do cache ${key}:`, error)
    return -1
  }
}

// Função para limpar todo o cache
export async function clearAllCache(): Promise<boolean> {
  try {
    await redisClient.flushdb()
    console.log('🗑️  Cache limpo completamente')
    return true
  } catch (error) {
    console.error('❌ Erro ao limpar cache:', error)
    return false
  }
}

// Função para obter informações do Redis
export async function getRedisInfo(): Promise<{
  connected: boolean
  status: string
  info: string
}> {
  try {
    const info = await redisClient.info()
    return {
      connected: redisClient.status === 'ready',
      status: redisClient.status,
      info,
    }
  } catch (error) {
    console.error('❌ Erro ao obter informações do Redis:', error)
    return {
      connected: false,
      status: 'error',
      info: '',
    }
  }
}
