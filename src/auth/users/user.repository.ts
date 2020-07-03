import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { CredentialsRegister, AuthUser } from "../dto/add-reg";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async register(register: CredentialsRegister): Promise<User> {
        const { fullname, username, email, password } = register

        const user = new User()
        user.fullname = fullname
        user.username = username
        user.email = email
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') { // duplicate username
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
        return user
    }

    async validateUserPassword(authUser: AuthUser): Promise<string> {
        const { email, password } = authUser;
        const user = await this.findOne({ email });

        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

}
