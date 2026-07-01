import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";



export class ConfirmResetDto {
    @ApiProperty({ example: "123456" })
    @IsString()
    otp: string

    @ApiProperty({ example: "ertyuERT" })
    @MinLength(6)
    password: string

}