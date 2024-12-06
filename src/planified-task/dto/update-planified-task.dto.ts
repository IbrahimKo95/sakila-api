import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanifiedTaskDto } from './create-planified-task.dto';

export class UpdatePlanifiedTaskDto extends PartialType(CreatePlanifiedTaskDto) {}
