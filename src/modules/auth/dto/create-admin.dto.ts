import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class CreateAdminDto {
    @ApiProperty({ description: "firstName", example: "Philip" })
    @IsString()
    firstName: string;

    @ApiProperty({ description: "firstName", example: "Philip" })
    @IsString()
    lastName: string;

    @ApiProperty({ description: "email", example: "AdegokePhilip5@gmail.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ description: "password", example: "123456" })
    @MinLength(6)
    password: string


    @ApiProperty({ description: "phone", example: "07042902022" })
    @IsOptional()
    @IsString()
    phone?: string

}