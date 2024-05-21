import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


@Global() // make this available 
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
