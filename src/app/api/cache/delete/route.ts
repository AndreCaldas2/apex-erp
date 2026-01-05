import { NextRequest, NextResponse } from 'next/server'
import { deleteCache } from '@/lib/redis'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key } = body

    if (!key) {
      return NextResponse.json(
        { success: false, error: 'Key é obrigatório' },
        { status: 400 }
      )
    }

    const success = await deleteCache(key)

    if (success) {
      return NextResponse.json({
        success: true,
        message: `Cache deletado: ${key}`,
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Cache não encontrado' },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Erro na API de delete cache:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
