import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResourceDto, UpdateResourceDto } from './dto';

@Injectable()
export class ResourcesService {
    constructor(private prisma: PrismaService) {}

    async getAllResouces() {
        const resources = await this.prisma.resource.findMany({});
        return resources;
    }

    async getUserResources(userId: string) {
        const data = await this.prisma.resource.findMany({
            where: {
                author_id: userId
            }
        });
        return data;
    }

    async findOne(id: string) {
        const data = await this.prisma.resource.findUnique({
            where: {
                id
            }
        });
        if (!data) throw new NotFoundException();
        return data;
    }

    async createResource(dto: CreateResourceDto, userId: string) {
        const data = await this.prisma.resource.create({
            data: {
                ...dto,
                author_id: userId
            }
        });
        return data;
    }

    async update(id: string, dto: UpdateResourceDto) {
        return this.prisma.resource.update({
            where: {
                id
            },
            data: dto
        });
    }
}
