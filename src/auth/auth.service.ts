import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './users/user.repository';
import { CredentialsRegister, AuthUser } from './dto/add-reg';
import { User } from './users/user.entity';
import { JwtPayload } from './jwt/payload';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
      ) {}

    async register(
        newuser: CredentialsRegister,
    ):Promise<User>{
        return this.userRepository.register(newuser)
    }

    async logIn(
        user: AuthUser,
    ):Promise<{ accessToken: string }>{
        const username = await this.userRepository.validateUserPassword(user)
        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { username }
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };

    }

}
