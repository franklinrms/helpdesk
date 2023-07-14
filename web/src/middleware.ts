import { NextRequest, NextResponse } from 'next/server'
import decode from 'jwt-decode'
import { User } from './lib/auth'

const isExpiredToken = (token: string) => {
  const tokenExp: User = decode(token)

  return new Date(tokenExp.exp * 1000) < new Date()
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (!token || isExpiredToken(token)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}
