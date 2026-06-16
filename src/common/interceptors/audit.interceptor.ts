import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
    constructor(private readonly prisma: PrismaService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const endpoint = request.url;
        const action = `${request.method} ${request.url}`;

        return next.handle().pipe(
            tap(async () => {
                if (user?.user_id) {
                    await this.prisma.auditLog.create({
                        data: {
                            admin_id: user.user_id,
                            action,
                            endpoint,
                        },
                    });
                }
            }),
        );
    }
}