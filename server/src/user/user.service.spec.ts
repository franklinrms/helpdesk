import { ErrorTypes } from '../errors/catalog'
import { prismaMock } from '../lib/prisma/singleton'
import { UserService } from './user.service'
import { userLoginMock, userMock, userRegisterMock } from './user.mock'

describe('userService', () => {
  const userService = new UserService(prismaMock)

  it('test create user valid input', async () => {
    prismaMock.user.create.mockResolvedValue(userMock)

    const result = await userService.createUser(userRegisterMock)
    expect(result?.token).toBeDefined()
  })

  it('test create user email already registered', async () => {
    prismaMock.user.findUnique.mockResolvedValue(userMock)

    await expect(userService.createUser(userRegisterMock)).rejects.toThrow(
      ErrorTypes.EmailInvalid,
    )
  })

  it('test find user incorrect password', async () => {
    prismaMock.user.findUnique.mockResolvedValue(userMock)

    const userLoginDto = {
      email: 'johndoe@example.com',
      password: 'wrongpassword',
    }
    await expect(userService.findUser(userLoginDto)).rejects.toThrow(
      ErrorTypes.EntityNotFound,
    )
  })

  it('test find user incorrect email', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)

    const userLoginDto = {
      email: 'wrong@example.com',
      password: 'password',
    }
    await expect(userService.findUser(userLoginDto)).rejects.toThrow(
      ErrorTypes.EntityNotFound,
    )
  })

  it('test find user valid input', async () => {
    prismaMock.user.findUnique.mockResolvedValue(userMock)

    const result = await userService.findUser(userLoginMock)
    expect(result.token).toBeDefined()
  })
})
