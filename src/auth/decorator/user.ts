import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../users/user.entity";

export const GetUser = createParamDecorator((data, req: ExecutionContext): User => {
    const request = req.switchToHttp().getRequest();
    const user = request.user;
    return user;
});