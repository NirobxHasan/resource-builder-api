import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { HttpExceptionFilter } from './common/exception-filter/http.ExpecptionFilter';
import { SuccessInterceptor } from './common/interceptors/success.interception';
import { ModulesModule } from './modules/modules.module';
import { PrismaModule } from './prisma/prisma.module';
import { ResourceAccessModule } from './resource-access/resource-access.module';
import { ResourcesModule } from './resources/resources.module';
import { S3Module } from './s3/s3.module';

@Module({
    imports: [
        JwtModule.register({ global: true }),
        AuthModule,
        PrismaModule,
        ResourcesModule,
        ModulesModule,
        ResourceAccessModule,
        S3Module
    ],
    controllers: [],
    providers: [
        // ...,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: SuccessInterceptor
        }
    ]
})
export class AppModule {}
