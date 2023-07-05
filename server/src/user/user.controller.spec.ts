import type { Request, Response } from 'express'
import { tokenMock, userLoginMock, userRegisterMock } from './user.mock'
import type { UserService } from './user.service'
import { UserController } from './user.controller'

const sut = () => {
  const mockService = {
    createUser: jest.fn().mockResolvedValue(tokenMock),
    findUser: jest.fn().mockResolvedValue(tokenMock),
  } as unknown as UserService

  const controller = new UserController(mockService)

  return { controller, mockService }
}

describe('userController', () => {
  const req = {} as Request
  const res = {} as Response

  beforeEach(() => {
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('test create calls createUser', async () => {
    req.body = userRegisterMock
    const { controller, mockService } = sut()

    await controller.create(req, res)

    expect(mockService.createUser).toHaveBeenCalled()
    expect(mockService.createUser).toHaveBeenCalledWith(userRegisterMock)
  })

  it('test create returns 201 and response on valid data', async () => {
    req.body = userRegisterMock
    const { controller } = sut()

    await controller.create(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(tokenMock)
  })

  it('test login calls findUser', async () => {
    req.body = userLoginMock
    const { controller, mockService } = sut()

    await controller.login(req, res)

    expect(mockService.findUser).toHaveBeenCalled()
    expect(mockService.findUser).toHaveBeenCalledWith(userLoginMock)
  })

  it('test login returns 200 and response on valid data', async () => {
    req.body = userLoginMock
    const { controller } = sut()

    await controller.login(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(tokenMock)
  })
})
