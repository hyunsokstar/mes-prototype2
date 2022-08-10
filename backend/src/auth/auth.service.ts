import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { CatsRepository } from './../cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly catsRepository: CatsRepository,
        private jwtService: JwtService,
    ) { }

    async jwtlogin(data: LoginRequestDto) {
        const { email, password } = data;
        // db 에서 email 에 해당하는 cat 정보 가져오기
        const cat = await this.catsRepository.findCatByEmail(email);
        console.log("cat info : ", cat);


        if (!cat) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
        }

        // bcrypt 에서 제공해주는 함수로 비밀번호 유효성 검사
        const isPasswordValidated: boolean = await bcrypt.compare(
            password,
            cat.password,
        );


        // 통과 못하면 에러 발생
        if (!isPasswordValidated) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
        }

        const payload = { email: email, sub: cat.id };

        return {
            email: cat.email,
            name: cat.name,
            token: this.jwtService.sign(payload),
        };

    }

}
