import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CourseStatus } from './new.enum/status';
//import { TaskStatus } from './task-status.enum';


@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  status: CourseStatus;
}
