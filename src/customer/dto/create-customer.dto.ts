import {IsString, IsNotEmpty, IsEmail, IsNumber, IsInt, Length} from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 45)
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 45)
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    @Length(1, 50)
    email: string;

    @IsInt()
    @IsNotEmpty()
    address_id: number;

    @IsInt()
    @IsNotEmpty()
    store_id: number;
}
