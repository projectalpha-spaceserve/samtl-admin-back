import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class HillpostService {
    private readonly baseUrl = process.env.HILLPOST_BASE_URL;
    private readonly headers = {
        'User-Agent': 'dart',
        'Content-Type': 'application/json',
        'hill-auth': 'admin',
    };

    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) { }

    async deviceChange(data: any): Promise<any> {
        try {
            const response$ = this.httpService.post(
                `${this.baseUrl}/secure/adm-clear-device/`,
                data,
                { headers: this.headers },
            );
            const { data: result } = await firstValueFrom(response$);
            return result;
        } catch (error) {
            return error?.response?.data ?? { error: 'Request failed' };
        }

    }

    async resetAccount(data: any): Promise<any> {
        try {
            const response$ = this.httpService.post(
                `${this.baseUrl}/secure/adm-clear-acct/`,
                data,
                { headers: this.headers },
            );
            const { data: result } = await firstValueFrom(response$);
            return result;
        } catch (error) {
            return error?.response?.data ?? { error: 'Request failed' };
        }

    }

    async unblockUser(data: any): Promise<any> {
        try {
            const response$ = this.httpService.post(
                `${this.baseUrl}/secure/adm-unblock-acct/`,
                data,
                { headers: this.headers },
            );
            const { data: result } = await firstValueFrom(response$);
            return result;
        } catch (error) {
            return error?.response?.data ?? { error: 'Request failed' };
        }

    }

    async enableSecurityReset(data: any): Promise<any> {

        try {
            const response$ = this.httpService.post(
                `${this.baseUrl}/secure/adm-enable-security-reset/`,
                data,
                { headers: this.headers },
            );
            const { data: result } = await firstValueFrom(response$);
            return result;
        } catch (error) {
            return error?.response?.data ?? { error: 'Request failed' };
        }

    }

    // async getUserDetails(account_number: string): Promise<any> {
    //     try {
    //         const response$ = this.httpService.get(
    //             `${this.baseUrl}/secure/adm-get-user/${account_number}/`,
    //             { headers: this.headers },
    //         );
    //         const { data: result } = await firstValueFrom(response$);
    //         return result;
    //     } catch (error) {
    //         return error?.response?.data ?? { error: 'Request failed' };
    //     }
    // }
}