import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResourceAccessService {
    constructor(private prisma: PrismaService) {}

    async findResourceById(code: string) {
        const data = await this.prisma.resource.findUnique({
            where: {
                code: code
            }
        });

        if (!data) throw new NotFoundException();

        return data;
    }

    async findResourceAccess(resourceId: string, userId: string) {
        const data = await this.prisma.resourceUser.findUnique({
            where: {
                user_id_resource_id: {
                    resource_id: resourceId,
                    user_id: userId
                }
            }
        });
        return data;
    }

    async joinRequest(resourceId: string, userId: string) {
        const data = await this.prisma.resourceUser.create({
            data: {
                resource_id: resourceId,
                user_id: userId
            }
        });

        return data;
    }

    async updateStatus(
        resourceId: string,
        userId: string,
        status: 'ACCEPTED' | 'REJECTED' | 'CANCELED'
    ) {
        const data = await this.prisma.resourceUser.update({
            where: {
                user_id_resource_id: {
                    resource_id: resourceId,
                    user_id: userId
                }
            },
            data: {
                status: status
            }
        });
        return data;
    }

    async leave(resourceId: string, userId: string) {
        const data = await this.prisma.resourceUser.delete({
            where: {
                user_id_resource_id: {
                    resource_id: resourceId,
                    user_id: userId
                }
            }
        });

        return data;
    }

    // For Resource Owner

    async allResourceUser(resourceId: string, authorid: string) {
        const data = await this.prisma.resourceUser.findMany({
            where: {
                rescource: {
                    id: resourceId,
                    author_id: authorid
                },
                status: 'ACCEPTED'
            },

            include: {
                user: {
                    select: {
                        email: true,
                        first_name: true,
                        last_name: true
                    }
                }
            }
        });

        return data;
    }
}
