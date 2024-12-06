import { Module } from '@nestjs/common';
import { PlanifiedTaskService } from './planified-task.service';
import { PlanifiedTaskController } from './planified-task.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [PlanifiedTaskController],
  providers: [PlanifiedTaskService],
})
export class PlanifiedTaskModule {}
