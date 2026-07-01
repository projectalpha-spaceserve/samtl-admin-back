import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { ConfirmResetDto } from './dto/ConfirmResetDto';

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

    @Post('register')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Admin Register' })
    @ApiBody({
        type: CreateAdminDto
    })
    @ApiResponse({ status: 200, description: 'Login successful' })
    async register(@Body() dto: CreateAdminDto) {
        return await this.authService.createAdmin(dto);
    }

    @Post('forgot-password')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Admin Register' })
    @ApiBody({
        type: ResetPasswordDto
    })
    @ApiResponse({ status: 200, description: 'password reset successful' })
    async resetPassword(@Body() dto: ResetPasswordDto) {
        return await this.authService.ResetPassword(dto);
    }


    @Post('confirm-reset')
    @HttpCode(200)
    @ApiOperation({ summary: 'Confirm OTP and reset password' })
    @ApiBody({ type: ConfirmResetDto })
    @ApiResponse({ status: 200, description: 'Password reset successful' })
    async confirmReset(@Body() dto: ConfirmResetDto) {
        return await this.authService.confirmReset(dto);
    }

}