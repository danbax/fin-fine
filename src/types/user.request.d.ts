import { Request } from 'express';

export interface UserRequest extends Request {
  user?: { id: string; role: string };
  headers?: { authorization?: string };
}
