import { NextRequest, NextResponse } from 'next/server'
import { getCache } from '@/lib/redis'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const key = searchParams.get('key')

    if (!key) {
      return NextResponse.json(
        { success: false, error: 'Key é obrigatório' },
        { status: 400 }
      )
    }

    const value = await getCache(key)

    return NextResponse.json({
      success: true,
      key,
      value,
    })
  } catch (error) {
    console.error('Erro na API de get cache:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
