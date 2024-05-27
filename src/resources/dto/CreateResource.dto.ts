import {
    IsBoolean,
    IsEmpty,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min
} from 'class-validator';

export class CreateResourceDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    cover_image?: string;

    @IsOptional()
    @IsString()
    intro_video?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    discount_price?: number;

    @IsEmpty()
    @IsOptional()
    @IsString()
    code?: string;

    @IsOptional()
    @IsBoolean()
    is_published?: boolean;
}
