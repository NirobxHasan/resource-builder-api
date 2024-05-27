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

    async joinRequest(resourceId: string, userId: string) {
        const data = await this.prisma.resourceUser.create({
            data: {
                resource_id: resourceId,
                user_id: userId
            }
        });

        return data;
    }
}
