import { Module } from '@nestjs/common';
import { ResourceAccessController } from './resource-access.controller';
import { ResourceAccessService } from './resource-access.service';

@Module({
  controllers: [ResourceAccessController],
  providers: [ResourceAccessService]
})
export class ResourceAccessModule {}
