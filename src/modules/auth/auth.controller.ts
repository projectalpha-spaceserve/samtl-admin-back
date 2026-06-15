import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(200)
    @ApiOperation({ summary: 'Admin login' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', example: 'admin@samtl.com' },
                password: { type: 'string', example: 'password123' },
            },
        },
    })
    @ApiResponse({ status: 200, description: 'Login successful' })
    async login(@Body() body: any) {
        return await this.authService.login(body.email, body.password);
    }
}