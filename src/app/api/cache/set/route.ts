import { NextRequest, NextResponse } from 'next/server'
import { setCache } from '@/lib/redis'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, value, ttl } = body

    if (!key) {
      return NextResponse.json(
        { success: false, error: 'Key é obrigatório' },
        { status: 400 }
      )
    }

    const success = await setCache(key, value, ttl || 300)

    if (success) {
      return NextResponse.json({
        success: true,
        message: `Cache armazenado: ${key}`,
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Erro ao armazenar cache' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Erro na API de set cache:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
