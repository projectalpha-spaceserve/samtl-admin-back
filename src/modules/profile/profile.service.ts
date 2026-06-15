import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService) { }

    async getProfile(user: any): Promise<any> {
        return await this.prisma.admin.findUnique({
            where: { id: user.user_id },
            select: {
                id: true,
                firstname: true,
                lastname: true,
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
                firstname: data.firstname,
                lastname: data.lastname,
                phone: data.phone,
            },
        });
    }
}