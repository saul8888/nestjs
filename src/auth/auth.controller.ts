import { Controller, Post, Body, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './users/user.entity';
import { CredentialsRegister, AuthUser } from './dto/add-reg';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator/user';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @Post('/register')
    register(
        @Body(ValidationPipe) newuser: CredentialsRegister,
    ):Promise<User>{
        return this.authService.register(newuser)
    }

    @Post('/login')
    logIn(
        @Body(ValidationPipe) user: AuthUser,
    ): Promise<{ accessToken: string }> {
        return this.authService.logIn(user)
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log(user)
    }

    @Post('/test1')
    @UseGuards(AuthGuard())
    test1(@Req() req){
        console.log(req)
    }
}
