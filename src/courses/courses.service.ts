import { Course } from './course.entity';
import { Injectable, NotImplementedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from './course.repository';
import { GetFilterDto } from './dto/get-filter';
import { AddCourse } from './dto/add-course';
import { CourseStatus } from './new.enum/status';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(CourseRepository)
        private courseRepository: CourseRepository,
    ){}

    async getCourses(
        filterDto: GetFilterDto,
    ):Promise<Course[]>{
        return this.courseRepository.getCourse(filterDto)
    }

    async addCourse(
        addCourseDto: AddCourse,
    ):Promise<Course>{
        return this.courseRepository.addCourse(addCourseDto)
    }

    async getById(
        id:number
    ):Promise<Course>{
        const found = await this.courseRepository.findOne({ where: { id} });
        
        if (!found) {
            throw new NotImplementedException(`Course with ID "${id}" not found`);
        }
    
        return found
    }

    async updateStatus(
            id: number, 
            status: CourseStatus,
        ):Promise<Course>{
            const course = await this.getById(id)
            course.status = status
            await course.save()
            return course
        }

    async deleteCourse(
        id: number,
    ):Promise<Course>{
        const course = await this.getById(id)
        const result = await this.courseRepository.delete({id})

        if (result.affected === 0) {
            throw new NotFoundException(`course with ID "${id}" not found`);
          }
        
        return course
    }

    

}
