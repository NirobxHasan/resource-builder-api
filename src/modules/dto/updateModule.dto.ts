import { PartialType } from '@nestjs/mapped-types';
import { CreateModuleDto } from './createModule.dto';

export class UpdateModuleDto extends PartialType(CreateModuleDto) {}
