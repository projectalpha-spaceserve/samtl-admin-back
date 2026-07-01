import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Prisma } from '@prisma/client';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfirmResetDto } from './dto/ConfirmResetDto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService
    ) { }

    async login(email: string, password: string): Promise<any> {
        const emailLower = email.toLowerCase();
        const admin = await this.prisma.admin.findUnique({
            where: { email: emailLower },
        });

        if (!admin) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password ?? '');

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: admin.id,
            email: admin.email,
        };

        const token = this.jwtService.sign(payload);

        return {
            token,
            admin: {
                id: admin.id,
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                phone: admin.phone,
            },
        };
    }

    async createAdmin(dto: CreateAdminDto): Promise<any> {

        const email = dto.email.toLowerCase()
        const existingAdmin = await this.prisma.admin.findUnique({ where: { email: email } })

        if (existingAdmin) {
            throw new ConflictException
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10)

        const admin = await this.prisma.admin.create({
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                email,
                password: hashedPassword,
                phone: dto.phone,
            }
        })
        const { password, ...result } = admin
        return result

    }

    async ResetPassword(dto: ResetPasswordDto): Promise<any> {
        const email = dto.email.toLowerCase()

        const admin = this.prisma.admin.findUnique({ where: { email: email } })

        if (!admin) {
            throw new NotFoundException("Admin not found")
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString()

        const expiry = new Date(Date.now() + 15 * 60 * 1000)

        await this.prisma.admin.update({
            where: { email }, data: {
                resetToken: otp,
                resetTokenExpiry: expiry
            }
        })

        await this.mailerService.sendMail({
            to: email,
            subject: 'password reset OTP',
            text: `Your OTP is ${otp}. it expires in 15 minutes `
        })

        return { message: 'OTP sent to your email' }
    }

    async confirmReset(dto: ConfirmResetDto): Promise<any> {
        const admin = await this.prisma.admin.findFirst({
            where: { resetToken: dto.otp },
        });

        if (!admin) {
            throw new NotFoundException('Invalid OTP');
        }

        if (!admin.resetTokenExpiry || admin.resetTokenExpiry < new Date()) {
            throw new BadRequestException('OTP has expired');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        await this.prisma.admin.update({
            where: { id: admin.id },
            data: {
                password: hashedPassword,
                resetToken: null,        // clear token after use
                resetTokenExpiry: null,
            },
        });

        return { message: 'Password reset successful' };

    }
}