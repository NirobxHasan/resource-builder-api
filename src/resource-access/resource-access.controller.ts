import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
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
    @HttpCode(HttpStatus.OK)
    async joinReuest(
        @Body() dto: JoinReuestDto,
        @GetCurrentUserId() userId: string
    ) {
        const resourceAccessData =
            await this.resourceAccessService.findResourceAccess(
                dto.resourceId,
                userId
            );
        console.log(resourceAccessData);

        if (resourceAccessData?.status === 'PENDDING') {
            return { message: 'Request already exists' };
        }
        return this.resourceAccessService.joinRequest(dto.resourceId, userId);
    }

    @Get('all-request')
    allRequest() {}

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

    //For ALL
    @Get('all-resourse-users')
    async getAllUsers(
        @Query('resourceId') resourceId: string,
        @GetCurrentUserId() authorId: string
    ) {
        return this.resourceAccessService.allResourceUser(resourceId, authorId);
    }
}
