import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { AtGuard } from 'src/common/guards';
import { GetCurrentUserId } from 'src/common/decorators';
import { CreateResourceDto } from './dto/CreateResource.dto';

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
    getUserResources(@GetCurrentUserId() userId: string,){
        return this.resourceService.getUserResources(userId)
    }


    @UseGuards(AtGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/')
    createResouce(@Body() dto:CreateResourceDto ,@GetCurrentUserId() userId: string){
        return this.resourceService.createResource(dto, userId)
    }

    @Patch('/')
    updateResource(){}

    @Patch('/publish')
    publish(){}

    


}
