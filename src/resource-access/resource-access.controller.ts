import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { CancelAccessDto, JoinReuestDto, LeaveAccessDto } from './dto';
import { ResourceAccessService } from './resource-access.service';

@Controller('resource-access')
@UseGuards(AtGuard)
export class ResourceAccessController {
    constructor(private resourceAccessService: ResourceAccessService) {}

    @Get()
    findResource(@Query('code') code: string) {
        return this.resourceAccessService.findResourceById(code);
    }

    @Post('join-request')
    joinReuest(@Body() dto: JoinReuestDto, @GetCurrentUserId() userId: string) {
        return this.resourceAccessService.joinRequest(dto.resourceId, userId);
    }

    @Post('cancel')
    cancelRequest(
        @Body() dto: CancelAccessDto,
        @GetCurrentUserId() userId: string
    ) {}

    @Get('my-resources')
    findAllAccesssedRequest(@GetCurrentUserId() userId: string) {}

    @Delete('leave')
    leaveResource(
        @Body() dto: LeaveAccessDto,
        @GetCurrentUserId() userId: string
    ) {}
}
