import { IsNotEmpty } from "class-validator";

export class AddCourse {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: number;
}