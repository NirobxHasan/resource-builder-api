import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResourcesService {

    constructor(private prisma: PrismaService){
    }




    async getAllResouces(){
        const resources = await this.prisma.resource.findMany({})
        return resources;
    }
}
