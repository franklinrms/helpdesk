/* eslint-disable no-unused-vars */

export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  Unauthorized = 'Unauthorized',
  EmailInvalid = 'EmailInvalid',
  BadRequest = 'BadRequest',
}

type ErrorResponseObject = {
  message: string
  httpStatus: number
}

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
}

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Entity not found',
    httpStatus: 404,
  },
  Unauthorized: {
    message: 'Unauthorized',
    httpStatus: 401,
  },
  EmailInvalid: {
    message: 'Email already registered',
    httpStatus: 409,
  },
  BadRequest: {
    message: 'Bad Request',
    httpStatus: 400,
  },
}
