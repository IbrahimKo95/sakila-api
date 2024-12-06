import {IsDate, IsInt, IsISO8601, IsNotEmpty} from "class-validator";
import {Transform} from "class-transformer";

export class CreateRentalDto {

    @IsISO8601()
    rental_date: Date;

    @IsInt()
    @IsNotEmpty()
    inventory_id: number;

    @IsInt()
    @IsNotEmpty()
    customer_id: number;

    @IsNotEmpty()
    @IsISO8601()
    return_date: Date;

    @IsInt()
    @IsNotEmpty()
    staff_id: number;

}
