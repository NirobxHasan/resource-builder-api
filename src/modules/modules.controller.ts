import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import { AtGuard } from 'src/common/guards';
import { CreateModuleDto, UpdateModuleDto } from './dto';
import { ModulesService } from './modules.service';

@Controller('modules')
@UseGuards(AtGuard)
export class ModulesController {
    constructor(private moduleService: ModulesService) {}

    @Get(':id')
    findOne(@Param('id') id: string) {}

    @Get()
    findMany(@Query('resourceid') resourceid: string) {
        return this.moduleService.findMany(resourceid);
    }

    @Post()
    create(
        @Query('resourceid') resourceid: string,
        @Body() dto: CreateModuleDto
    ) {
        return this.moduleService.create(resourceid, dto);
    }

    @Patch()
    update(@Body() dto: UpdateModuleDto) {}
}
