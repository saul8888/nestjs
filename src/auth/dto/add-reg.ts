import { IsString, MinLength, MaxLength, Matches, IsEmail, IsNotEmpty } from 'class-validator';

export class CredentialsRegister {

    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'password too weak' },
    )
    password: string;

    //@IsNotEmpty()
    //salt: string;
}

export class AuthUser {
    //@IsNotEmpty()
    //username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

}