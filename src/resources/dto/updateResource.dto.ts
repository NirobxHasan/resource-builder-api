import { PartialType } from '@nestjs/mapped-types';
import { CreateResourceDto } from './CreateResource.dto';

export class UpdateResourceDto extends PartialType(CreateResourceDto) {}
