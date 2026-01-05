import { NextResponse } from 'next/server'
import { clearAllCache } from '@/lib/redis'

export async function POST() {
  try {
    const success = await clearAllCache()

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Todo o cache foi limpo',
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Erro ao limpar cache' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Erro na API de clear cache:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
