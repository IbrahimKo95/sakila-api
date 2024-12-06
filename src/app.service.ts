import { Injectable } from '@nestjs/common';
import {Cron, CronExpression} from "@nestjs/schedule";
import {PrismaService} from "./prisma/prisma.service";

@Injectable()
export class AppService {

  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCronJ3() {
    const actualDate = new Date();
    //console.log(actualDate.toISOString().split('.')[0]+"Z");
    const tasks = await this.prisma.planifiedTask.findMany({
      where: {
        date: actualDate.toISOString().split('.')[0]+"Z",
        type: "J-3",
        status: "PENDING"
      },
      include: {
        Rental: {
          include: {
            customer: true
          }
        }
      }
    })
    tasks.map(task => {
      console.log('Email envoyé à ' + task.Rental.customer.email + ' : La location se termine dans 3 jours');
      this.prisma.planifiedTask.update({
        where: {
          id: task.id
        },
        data: {
          status: "DONE"
        }
      })
    })

  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCronJ5() {
    const actualDate = new Date();
    //console.log(actualDate.toISOString().split('.')[0]+"Z");
    const tasks = await this.prisma.planifiedTask.findMany({
      where: {
        date: actualDate.toISOString().split('.')[0]+"Z",
        type: "J-5",
        status: "PENDING"
      },
      include: {
        Rental: {
          include: {
            customer: true
          }
        }
      }
    })
    tasks.map(async task => {
      console.log('Email envoyé à ' + task.Rental.customer.email + ' : La location se termine dans 5 jours');
      await this.prisma.planifiedTask.update({
        where: {
          id: task.id
        },
        data: {
          status: "DONE"
        }
      })
    })

  }
}
