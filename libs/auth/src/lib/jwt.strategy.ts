import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env['JWT_SECRET'] || 'supersecret',
    });
  }

  async validate(payload: JwtPayload) {
    // 👇 this is what gets attached to req.user
    console.log('Decoded JWT payload:', payload);
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
