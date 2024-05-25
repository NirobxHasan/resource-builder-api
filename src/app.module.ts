import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ResourcesModule } from './resources/resources.module';


@Module({
  imports: [AuthModule, PrismaModule, ResourcesModule],
 
})
export class AppModule {}
