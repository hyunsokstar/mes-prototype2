import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

// import { Injectable } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { Payload } from './jwt.payload';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly catsRepository: CatsRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // 헤더로부터 토큰 추출
            secretOrKey: process.env.JWT_SECRET,  // secret key
            ignoreExpiration: false,  // 유효 기간    
        });
    }

    async validate(payload: Payload) {
        const cat = await this.catsRepository.findCatByIdWithoutPassword(
            payload.sub,
        );

        if (cat) {
            return cat; // request.user 에 설정 됨
        } else {
            throw new UnauthorizedException('접근 오류');
        }
    }

}