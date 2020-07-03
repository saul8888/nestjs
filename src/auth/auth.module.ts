import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users/user.repository';
import { JwtStrategy } from './jwt/auth';

@Module({
  imports: [
    //create token
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [
    AuthService,
    JwtStrategy,//activate Bearer
  ],
  controllers: [AuthController],
  exports: [
    JwtStrategy,
    PassportModule,
  ],
})
export class AuthModule {}
