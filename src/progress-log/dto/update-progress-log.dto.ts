import { PartialType } from '@nestjs/mapped-types';
import { CreateProgressLogDto } from './create-progress-log.dto';

export class UpdateProgressLogDto extends PartialType(CreateProgressLogDto) {}
