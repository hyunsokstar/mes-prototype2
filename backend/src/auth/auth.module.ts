
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CatsModule } from './../cats/cats.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),    // .env 설정이 유효하도록 해줌
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),  // 나중에 만들 strategy 에 대해 기본적인 설정

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),
    forwardRef(() => CatsModule),       // CatsModule 임포트 해야 repository 접근 가능
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})

export class AuthModule { }