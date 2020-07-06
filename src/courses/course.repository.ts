import { Course } from './course.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetFilterDto } from "./dto/get-filter";
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { AddCourse } from './dto/add-course';
import { CourseStatus } from './new.enum/status';
import { User } from 'src/auth/users/user.entity';


@EntityRepository(Course)
export class CourseRepository extends Repository<Course>{
  private logger = new Logger('TaskRepository');

  async getCourse(
    filterDto: GetFilterDto,
    user: User,
  ):Promise<Course[]>{
    const { status, search, price } = filterDto
    const query = this.createQueryBuilder('course')

    query.where('course.userId = :userId', { userId: user.id });

    if(status){
      query.andWhere('course.status = :status', {status})
    }
    if(search){
      query.andWhere('(course.title LIKE :search OR course.description LIKE :search)',{search: `%${search}%`})
    }
    if(price){
      query.andWhere('course.price < :price', {price})
    }

    try {
      const course = await query.getMany()
      return course
    } catch (error) {
      this.logger.error(`Failed to get courses for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }

  }

  async addCourse(
    newCourse: AddCourse,
    user: User,
  ):Promise<Course>{
    //console.log(newCourse)
    const { title, description, price } = newCourse

    const course = new Course();
    course.title = title
    course.description = description;
    course.price = price
    course.status = CourseStatus.ACT;
    course.user = user;

    try {
      await course.save();
    } catch (error) {
      this.logger.error(`Failed to create a task for user "${user.username}". Data: ${newCourse}`, error.stack);
      throw new InternalServerErrorException();
    }

    return course;
  }

}