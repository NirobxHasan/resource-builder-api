import {
    IsBoolean,
    IsJSON,
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator';

export class CreateModuleDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsJSON()
    content: string;

    @IsOptional()
    @IsBoolean()
    is_lock: boolean;
}
