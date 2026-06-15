import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async login(email: string, password: string): Promise<any> {
        const admin = await this.prisma.admin.findUnique({
            where: { email },
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
                firstname: admin.firstname,
                lastname: admin.lastname,
                email: admin.email,
                phone: admin.phone,
            },
        };
    }
}