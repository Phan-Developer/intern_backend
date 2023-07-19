import { detectDevice } from '@/utils/function-global';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

interface client_data {
  os: {
    name: string;
    version: string;
  } | null;
  browser: {
    name: string;
    version: string;
  } | null;
  device: string | null;
  ip: string;
}

const checkRequireDataLogion = (req: Request) => {
  if (req.url === '/api/login' && !req.body.Email && !req.body.password) {
    throw new UnauthorizedException('DATA_NOT_VALIDATE');
  }
};

@Injectable()
export class PreprocessMiddleware implements NestMiddleware {
  use(
    req: Request & {
      client_data: client_data;
    },
    res: Response,
    next: NextFunction,
  ) {
    checkRequireDataLogion(req);
    const userAgent = req.headers['user-agent'];
    const info = detectDevice(userAgent);

    const ipAddress =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    req.client_data = { ...info, ['ip']: ipAddress.toString() };

    next();
  }
}
