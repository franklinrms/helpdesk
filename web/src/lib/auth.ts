'use server'
import { cookies } from 'next/headers'
import decode from 'jwt-decode'

export interface User {
  id: string
  name: string
  email: string
  role: string
  avatarUrl: string
  iat: number
  exp: number
}

export const getAvatarUrl = (role: string) => {
  switch (role) {
    case 'ADMIN':
      return '/avatars/admin_avatar.png'
    case 'USER':
      return '/avatars/user_avatar.png'
    default:
      return '/avatars/helper_avatar.png'
  }
}

export async function getUser(): Promise<User> {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('Unauthenticated.')
  }

  const user: User = decode(token)

  return {
    ...user,
    avatarUrl: getAvatarUrl(user.role),
  }
}
