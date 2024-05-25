import { Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { AtGuard } from 'src/common/guards';

@Controller('resources')
export class ResourcesController {

    constructor(private resourceService: ResourcesService){}

    //For CMS
    @Get('/all-resources')
    getAllResources(){


        return this.resourceService.getAllResouces()
    }


    //User 

    @UseGuards(AtGuard)
    @Get('/')
    getUserResources(){
        return {msg: 'All Resource'}
    }

    @Post('/')
    createResouce(){}

    @Patch('/')
    updateResource(){}

    @Patch('/publish')
    publish(){}

    


}
