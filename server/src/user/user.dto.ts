import z from 'zod'
import { type Role } from '@prisma/client'

export type UserDto = {
  id: string
  name: string
  email: string
  role: Role
}

export const UserRegisterSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'HELPER', 'USER']).default('USER'),
})

export type UserRegisterDto = z.infer<typeof UserRegisterSchema>

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type UserLoginDto = z.infer<typeof UserLoginSchema>
