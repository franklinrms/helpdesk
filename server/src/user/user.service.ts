import md5 from 'md5'
import { prisma } from '../../prisma'
import { ErrorTypes } from '../errors/catalog'
import { UserRegisterDto } from './user.dto'

export class UserService {
  private getUserByEmail = async (email: string) =>
    prisma.user.findUnique({
      where: {
        email,
      },
    })

  private validateEmail = async (email: string) => {
    const emailAlreadyRegistered = await this.getUserByEmail(email)
    if (emailAlreadyRegistered) throw new Error(ErrorTypes.EmailInvalid)
    return true
  }

  public async create({ name, email, password, role }: UserRegisterDto) {
    if (await this.validateEmail(email)) {
      const user = await prisma.user.create({
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
      return user
    }
  }
}
