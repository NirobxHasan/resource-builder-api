import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
    constructor(private readonly s3Service: S3Service) {}
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const fileUrl = await this.s3Service.uploadFile(file);
        return { url: fileUrl };
    }

    @Get(':key')
    async getPresignedUrl(@Param('key') key: string, @Res() res) {
        try {
            const url = await this.s3Service.getPresignedUrl(key);
            return { url };
        } catch (error) {
            throw new HttpException(
                'Error generating presigned URL',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
