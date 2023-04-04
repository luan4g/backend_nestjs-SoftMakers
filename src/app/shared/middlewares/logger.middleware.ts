import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) { }

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(' ')[1];

      this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY
      });

      next();
    } catch (error) {
      throw new UnauthorizedException({
        message: 'token invalid'
      });
    }

  }
}
