import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerModule } from './customer/customer.module';
import { RentalModule } from './rental/rental.module';
import {ScheduleModule} from "@nestjs/schedule";
import { PlanifiedTaskModule } from './planified-task/planified-task.module';

@Module({
  imports: [
      PrismaModule,
      CustomerModule,
      RentalModule,
      ScheduleModule.forRoot(),
      PlanifiedTaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
