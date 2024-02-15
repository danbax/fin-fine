// auth.middleware.spec.ts
import { AuthMiddleware } from './auth.middleware';
import { Request, Response } from 'express';

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;
  let mockRequest: any;
  let mockResponse: Partial<Response>;
  let nextFunction: jest.Mock;

  beforeEach(() => {
    middleware = new AuthMiddleware();
    mockRequest = {};
    mockResponse = {};
    nextFunction = jest.fn();
  });

  it('should attach user to request if Authorization header is present', () => {
    mockRequest.headers = {
      authorization: 'Bearer some-token',
    };

    middleware.use(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockRequest.user).toBeDefined();
    expect(mockRequest.user).toEqual({ id: 'userId', role: 'userRole' });
    expect(nextFunction).toBeCalled();
  });

  it('should not attach user to request if Authorization header is missing', () => {
    mockRequest.headers = {};

    middleware.use(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockRequest.user).toBeUndefined();
    expect(nextFunction).toBeCalled();
  });
});
