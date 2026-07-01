import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService) { }

    async getProfile(user: any): Promise<any> {
        return await this.prisma.admin.findUnique({
            where: { id: user.user_id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                created_at: true,
            },
        });
    }

    async updateProfile(user: any, data: any): Promise<any> {
        return await this.prisma.admin.update({
            where: { id: user.user_id },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
            },
        });
    }
}