import { useCallback } from 'react'

export function useRedisCache() {
  const setCache = useCallback(
    async <T,>(key: string, value: T, ttl: number = 300): Promise<boolean> => {
      try {
        const response = await fetch('/api/cache/set', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, value, ttl }),
        })
        const data = await response.json()
        return data.success
      } catch (error) {
        console.error('Erro ao armazenar cache:', error)
        return false
      }
    },
    []
  )

  const getCache = useCallback(async <T,>(key: string): Promise<T | null> => {
    try {
      const response = await fetch(`/api/cache/get?key=${encodeURIComponent(key)}`)
      const data = await response.json()
      return data.success ? data.value : null
    } catch (error) {
      console.error('Erro ao recuperar cache:', error)
      return null
    }
  }, [])

  const deleteCache = useCallback(async (key: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/cache/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      })
      const data = await response.json()
      return data.success
    } catch (error) {
      console.error('Erro ao deletar cache:', error)
      return false
    }
  }, [])

  const clearAll = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/cache/clear', {
        method: 'POST',
      })
      const data = await response.json()
      return data.success
    } catch (error) {
      console.error('Erro ao limpar cache:', error)
      return false
    }
  }, [])

  return {
    setCache,
    getCache,
    deleteCache,
    clearAll,
  }
}
