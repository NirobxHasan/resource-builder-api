import {
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Length
} from 'class-validator';
import { AuthDto } from './auth.dto';

export class SignupDto extends AuthDto {
    @IsNotEmpty()
    @Length(1, 50, {
        message: 'First name must be between 1 and 50 characters'
    })
    // @Matches(/^[A-Za-z]+$/, { message: 'First name can only contain letters' })
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 50, {
        message: 'First name must be between 1 and 50 characters'
    })
    // @Matches(/^[A-Za-z]+$/, { message: 'Last name can only contain letters' })
    last_name: string;

    @IsOptional()
    @IsPhoneNumber()
    phone: string;
}
