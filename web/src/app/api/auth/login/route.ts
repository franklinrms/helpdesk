import { apiUrl } from '@/lib/apiUrl'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30 // 30 days

  const { token } = await fetch(apiUrl('/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json())

  if (token) {
    return NextResponse.json(
      {},
      {
        headers: {
          'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};`,
        },
      },
    )
  }

  return NextResponse.json({}, { status: 401 })
}
