import { Course } from './course.entity';
import { Injectable, NotImplementedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from './course.repository';
import { GetFilterDto } from './dto/get-filter';
import { AddCourse } from './dto/add-course';
import { CourseStatus } from './new.enum/status';
import { User } from 'src/auth/users/user.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(CourseRepository)
        private courseRepository: CourseRepository,
    ){}

    async getCourses(
        filterDto: GetFilterDto,
        user: User,
    ):Promise<Course[]>{
        return this.courseRepository.getCourse(filterDto, user)
    }

    async addCourse(
        addCourseDto: AddCourse,
        user: User,
    ):Promise<Course>{
        return this.courseRepository.addCourse(addCourseDto, user)
    }

    async getById(
        id: number,
        user: User,
    ):Promise<Course>{
        const found = await this.courseRepository.findOne({ where: { id, userId: user.id } });
        
        if (!found) {
            throw new NotImplementedException(`Course with ID "${id}" not found`);
        }
    
        return found
    }

    async updateStatus(
            id: number, 
            status: CourseStatus,
            user: User,
        ):Promise<Course>{
            const course = await this.getById(id, user)
            course.status = status
            await course.save()
            return course
        }

    async deleteCourse(
        id: number,
        user: User,
    ):Promise<Course>{
        const course = await this.getById(id, user)
        const result = await this.courseRepository.delete({ id, userId: user.id })

        if (result.affected === 0) {
            throw new NotFoundException(`course with ID "${id}" not found`);
        }
        
        return course
    }

    

}
