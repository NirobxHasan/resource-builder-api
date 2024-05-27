import { IsNotEmpty, IsString } from 'class-validator';

export class JoinReuestDto {
    @IsNotEmpty()
    @IsString()
    resourceId: string;
}
export class CancelAccessDto {
    @IsNotEmpty()
    @IsString()
    resourceId: string;
}
export class LeaveAccessDto {
    @IsNotEmpty()
    @IsString()
    resourceId: string;
}
