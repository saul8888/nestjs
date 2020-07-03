import { Course } from './course.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetFilterDto } from "./dto/get-filter";
import { InternalServerErrorException } from '@nestjs/common';
import { AddCourse } from './dto/add-course';
import { CourseStatus } from './new.enum/status';


@EntityRepository(Course)
export class CourseRepository extends Repository<Course>{

  async getCourse(
    filterDto: GetFilterDto,
  ):Promise<Course[]>{
    const { status, search, price } = filterDto
    const query = this.createQueryBuilder('course')

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
      throw new InternalServerErrorException();
    }

  }

  async addCourse(
    newCourse: AddCourse,
  ):Promise<Course>{
    //console.log(newCourse)
    const { title, description, price } = newCourse

    const course = new Course();
    course.title = title
    course.description = description;
    course.price = price
    course.status = CourseStatus.ACT;

    try {
      await course.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return course;
  }

}