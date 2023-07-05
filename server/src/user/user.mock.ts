import { Role } from '@prisma/client'
import md5 from 'md5'
import { UserRegisterDto, UserLoginDto, UserDto } from './user.dto'

export const userMock: UserDto & { password: string } = {
  id: 'cljkvmvsy0000h5jc43ebxqcq',
  name: 'John Doe',
  email: 'johndoe@example.com',
  role: Role.USER,
  password: md5('password'),
}

export const userRegisterMock: UserRegisterDto = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: 'password',
  role: Role.USER,
}

export const userLoginMock: UserLoginDto = {
  email: 'johndoe@example.com',
  password: 'password',
}

export const tokenMock = {
  token: 'token1001token',
}
