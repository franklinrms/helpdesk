export enum ErrorTypes {
    EntityNotFound = 'EntityNotFound',
    TokenNotFound = 'TokenNotFound',
    InvalidEntity = 'InvalidEntity',
    EmailInvalid = 'EmailInvalid',
    Unauthorized = 'Unauthorized',
  }

  interface ErrorResponseObject {
    message: string;
    httpStatus: number
  }

  export type ErrorCatalog = {
    [key in ErrorTypes]: ErrorResponseObject

  };

  export const errorCatalog: ErrorCatalog = {
    InvalidEntity: {
      message: 'Invalid entity',
      httpStatus: 400,
    },
    TokenNotFound: {
      message: 'Token not found',
      httpStatus: 401,
    },
    EntityNotFound: {
      message: 'Entity not found',
      httpStatus: 404,
    },
    EmailInvalid: {
      message: 'Email already registered',
      httpStatus: 409,
    },
    Unauthorized: {
      message: 'Unauthorized user',
      httpStatus: 401,
    },
  };
