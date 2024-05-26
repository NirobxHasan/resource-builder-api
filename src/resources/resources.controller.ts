import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';

import { CreateResourceDto, UpdateResourceDto } from './dto';
import { ResourcesService } from './resources.service';

@Controller('resources')
// @UseInterceptors(SuccessInterceptor)
export class ResourcesController {
    constructor(private resourceService: ResourcesService) {}

    //For CMS
    @Get('/all-resources')
    getAllResources() {
        return this.resourceService.getAllResouces();
    }

    //User

    @UseGuards(AtGuard)
    @Get('/')
    getUserResources(@GetCurrentUserId() userId: string) {
        return this.resourceService.getUserResources(userId);
    }

    //Get Single Resource
    @UseGuards(AtGuard)
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.resourceService.findOne(id);
    }

    //Create Resource
    @UseGuards(AtGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post('/')
    createResouce(
        @Body() dto: CreateResourceDto,
        @GetCurrentUserId() userId: string
    ) {
        return this.resourceService.createResource(dto, userId);
    }

    //Update Resource
    @UseGuards(AtGuard)
    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    updateResource(@Param('id') id: string, @Body() dto: UpdateResourceDto) {
        return this.resourceService.update(id, dto);
    }

    @Patch('/publish')
    publish() {}
}
