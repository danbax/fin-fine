import { AuthGuard } from './auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(() => {
    authGuard = new AuthGuard();
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should allow access when Authorization header is present', () => {
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer some-token',
          },
        }),
      }),
    } as unknown as ExecutionContext;

    expect(authGuard.canActivate(mockExecutionContext)).toBe(true);
  });

  it('should deny access when Authorization header is missing', () => {
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    } as unknown as ExecutionContext;

    expect(authGuard.canActivate(mockExecutionContext)).toBe(false);
  });
});
