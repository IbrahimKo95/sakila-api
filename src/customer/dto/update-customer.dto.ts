import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import {IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(1, 45)
    first_name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(1, 45)
    last_name?: string;

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    @Length(1, 50)
    email?: string;

    @IsOptional()
    @IsInt()
    @IsNotEmpty()
    address_id?: number;

    @IsOptional()
    @IsInt()
    @IsNotEmpty()
    store_id?: number;
}
