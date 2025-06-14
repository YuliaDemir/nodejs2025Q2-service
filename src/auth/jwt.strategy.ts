import { Injectable } from "@nestjs/common";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_ACCESS_SECRET,
        });
    }

    async validate (payload: any) {
        return payload;
    }
}
