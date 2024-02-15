// auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      // TODO:: extract the token from the header and verify its validity
      // TODO:: load the user details and attach them to the request.
      req['user'] = { id: 'userId', role: 'userRole' };
    }

    next();
  }
}
