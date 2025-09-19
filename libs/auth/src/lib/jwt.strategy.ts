import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: Request) => {
          return request?.cookies?.jwt;
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env['JWT_SECRET'] || 'supersecret',
    });
  }

  async validate(payload: JwtPayload) {
    // 👇 this is what gets attached to req.user
    console.log('Decoded JWT payload:', payload);
    return { 
      userId: payload.sub, 
      email: payload.email, 
      role: payload.role,
      organizationId: payload.organizationId,
      departmentId: payload.departmentId
    };
  }
}
