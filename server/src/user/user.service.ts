import md5 from 'md5'
import type { PrismaClient } from '@prisma/client'
import { ErrorTypes } from '../errors/catalog'
import { UserLoginDto, UserRegisterDto } from './user.dto'
import { generateToken } from '../lib/generateToken'

export class UserService {
  constructor(private prisma: PrismaClient) {}

  private getUserByEmail = async (email: string) =>
    this.prisma.user.findUnique({
      where: {
        email,
      },
    })

  private validateEmail = async (email: string) => {
    const emailAlreadyRegistered = await this.getUserByEmail(email)
    if (emailAlreadyRegistered) throw new Error(ErrorTypes.EmailInvalid)
    return true
  }

  public async createUser({ name, email, password, role }: UserRegisterDto) {
    if (await this.validateEmail(email)) {
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: md5(password),
          role,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      })
      const token = generateToken(user)

      return { token }
    }
  }

  public async findUser({ email, password }: UserLoginDto) {
    const user = await this.getUserByEmail(email)

    if (!user || user.password !== md5(password)) {
      throw new Error(ErrorTypes.EntityNotFound)
    }

    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })

    return { token }
  }
}
