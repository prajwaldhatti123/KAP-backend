import { IsEmail, IsString } from "class-validator";
import { from } from "rxjs";

export class CreateEmailServiceDto {

    @IsString()
    @IsEmail()
    to: string;

    // @IsString()
    // subject: string;

    // @IsString()
    // text: string;

    // @IsString()
    // html: string;
}
