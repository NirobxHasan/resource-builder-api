import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class HandleRequestDto {
    @IsNotEmpty()
    @IsString()
    requestUserId: string;

    @IsNotEmpty()
    @IsString()
    resourceId: string;

    @IsNotEmpty()
    @IsEnum(['ACCEPTED', 'REJECTED'])
    action: 'ACCEPTED' | 'REJECTED';
}
