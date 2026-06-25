import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({ description: 'Email', required: true, example: 'adegokephilip5@gmail.com' })
    @IsString()
    email: string;
}
