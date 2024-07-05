import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResourceDto, HandleRequestDto, UpdateResourceDto } from './dto';

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

    async findOne(id: string, userId: string) {
        const data = await this.prisma.resource.findUnique({
            where: {
                id,
                author_id: userId
            },
            include: {
                modules: {
                    select: {
                        id: true,
                        title: true
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        });
        if (!data) throw new NotFoundException();
        return data;
    }

    async createResource(dto: CreateResourceDto, userId: string) {
        const data = await this.prisma.resource.create({
            data: {
                ...dto,
                author_id: userId,
                code: this.generateUniqueCode(8)
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

    async joinRequest(recourceId: string, userId: string) {
        const data = await this.prisma.resourceUser.findMany({
            where: {
                rescource: {
                    id: recourceId,
                    author_id: userId
                },
                status: 'PENDDING'
            },
            include: {
                user: {
                    select: {
                        first_name: true,
                        last_name: true,
                        email: true
                    }
                }
            }
        });

        return data;
    }

    async handleRequest(dto: HandleRequestDto, userId: string) {
        const resourceUser = await this.prisma.resourceUser.findFirst({
            where: {
                resource_id: dto.resourceId,
                user_id: dto.requestUserId,
                rescource: {
                    author_id: userId
                }
            }
        });

        if (!resourceUser) {
            throw new NotFoundException(
                'This entry not found or you do not have permission to update it'
            );
        }

        const data = await this.prisma.resourceUser.update({
            where: {
                user_id_resource_id: {
                    resource_id: dto.resourceId,
                    user_id: dto.requestUserId
                }
            },
            data: {
                status: dto.action
            }
        });

        return data;
    }

    generateUniqueCode(length) {
        // Define all characters
        const allChars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        // Use random.sample to pick random characters
        return [...crypto.getRandomValues(new Uint8Array(length))]
            .map((val) => allChars[val % allChars.length])
            .join('');
    }
}
