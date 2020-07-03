import { CourseStatus } from '../new.enum/status';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetFilterDto {
  @IsOptional()
  @IsIn([CourseStatus.ACT, CourseStatus.DACT])
  status: CourseStatus ;

  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsNotEmpty()
  price: string;
}
