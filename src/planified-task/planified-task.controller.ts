import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanifiedTaskService } from './planified-task.service';
import { CreatePlanifiedTaskDto } from './dto/create-planified-task.dto';

@Controller('planified-task')
export class PlanifiedTaskController {
  constructor(private readonly planifiedTaskService: PlanifiedTaskService) {}

  @Post()
  create(@Body() createPlanifiedTaskDto: CreatePlanifiedTaskDto) {
    return this.planifiedTaskService.create(createPlanifiedTaskDto);
  }

  @Get()
  findAll() {
    return this.planifiedTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planifiedTaskService.findOne(+id);
  }

  @Get(':id/run')
  runTask(@Param('id') id: string) {
    return this.planifiedTaskService.runTask(+id);
  }

}
