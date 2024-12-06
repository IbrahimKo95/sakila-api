import {Injectable, NotFoundException} from '@nestjs/common';
import { CreatePlanifiedTaskDto } from './dto/create-planified-task.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class PlanifiedTaskService {

  constructor(private readonly prisma: PrismaService) {}
  create(createPlanifiedTaskDto: CreatePlanifiedTaskDto) {
    return 'This action adds a new planifiedTask';
  }

  findAll() {
    return this.prisma.planifiedTask.findMany({
      where: {
        status: "PENDING"
      }
    });
  }

  findOne(id: number) {
    return this.prisma.planifiedTask.findUnique({
        where: {
            id: id
        }
    });
  }

  async runTask(id: number) {
    const task = await this.prisma.planifiedTask.findUnique({
      where: {
        id: id
      },
      include: {
        Rental: {
          include: {
            customer: true
          }
        }
      }
    });

    if (!task) {
      throw new NotFoundException(`Task not found`);
    }

    console.log(`Email envoyé à ${task.Rental.customer.email} : La location se termine dans ${task.type === "J-3" ? "3" : "5"} jours`);
    await this.prisma.planifiedTask.update({
      where: {
        id: id
      },
      data: {
        status: "DONE"
      }
    })
    return 'Tâche exécutée'
  }

}
