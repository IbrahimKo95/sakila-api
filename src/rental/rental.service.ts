import {HttpException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import {PrismaService} from "../prisma/prisma.service";
import {DateTime} from "luxon";
@Injectable()
export class RentalService {

  constructor(private readonly prisma: PrismaService) {}
  async create(createRentalDto: CreateRentalDto) {
    const customer = await this.prisma.customer.findUnique({
        where: {
            customer_id: createRentalDto.customer_id
        },
        select: {
          timezone: true
        }
    });
    if (!customer) {
        throw new NotFoundException(`Customer with ID ${createRentalDto.customer_id} not found`);
    }

    const rentalDate = DateTime.fromISO(createRentalDto.rental_date.toString(), {zone: customer.timezone}).toUTC();
    const returnDate = DateTime.fromISO(createRentalDto.return_date.toString(), {zone: customer.timezone}).toUTC();
    console.log(rentalDate);
    console.log(returnDate);
    const rentalDuration = returnDate.diff(rentalDate, 'days').days;
    if(rentalDuration < 7 || rentalDuration > 21) {
      throw new HttpException('Rental duration must be between 7 and 21 days', 400);
    }

    const rental = await this.prisma.rental.create({
      data: {
        ...createRentalDto,
        rental_date: rentalDate.toISO(),
        return_date: returnDate.toISO(),
        last_update: new Date(),
      }
    });
    await this.prisma.planifiedTask.create({
      data: {
        type: 'J-3',
        date: returnDate.minus({days: 3}).toISO(),
        rental_id: rental.rental_id
      }
    });
    await this.prisma.planifiedTask.create({
      data: {
        type: 'J-5',
        date: returnDate.minus({days: 5}).toISO(),
        rental_id: rental.rental_id
      }
    });

    return rental;

  }

  findAll() {
    return `This action returns all rental`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rental`;
  }

  update(id: number, updateRentalDto: UpdateRentalDto) {
    return `This action updates a #${id} rental`;
  }

  remove(id: number) {
    return `This action removes a #${id} rental`;
  }
}
