import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CourseStatus } from './new.enum/status';
import { User } from 'src/auth/users/user.entity';

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

  @ManyToOne(type => User, user => user.courses, { eager: false })
  user: User;
  
  @Column()
  userId: number;
}
