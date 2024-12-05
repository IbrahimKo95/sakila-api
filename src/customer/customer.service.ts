import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: {
        ...createCustomerDto,
        active: 1,
        create_date: new Date(),
        last_update: new Date(),
      }
    });
  }

  findAll() {
    return this.prisma.customer.findMany();
  }

  findOne(id: number) {
    return this.prisma.customer.findUnique({
        where: {
          customer_id: id
        }
    });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({
        where: {
            customer_id: id
        },
        data: updateCustomerDto
    });
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
