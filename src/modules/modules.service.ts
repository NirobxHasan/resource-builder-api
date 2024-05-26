import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateModuleDto } from './dto';

@Injectable()
export class ModulesService {
    constructor(private prisma: PrismaService) {}

    async findOne(id: string) {
        const data = await this.prisma.module.findUnique({
            where: {
                id
            }
        });

        if (!data) throw new NotFoundException();
        return data;
    }

    async findMany(resourceId: string) {
        const data = await this.prisma.module.findMany({
            where: {
                resource_id: resourceId
            }
        });
        if (!data) throw new NotFoundException();
        return data;
    }

    async create(resourceId: string, dto: CreateModuleDto) {
        return await this.prisma.module.create({
            data: {
                ...dto,
                resource_id: resourceId
            }
        });
    }
}
