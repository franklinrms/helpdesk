/* eslint-disable no-unused-vars */

export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  Unauthorized = 'Unauthorized',
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
}
