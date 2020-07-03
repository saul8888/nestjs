import { Controller, Get, Query, ValidationPipe, Post, UsePipes, Body, Param, Put, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './course.entity';
import { GetFilterDto } from './dto/get-filter';
import { AddCourse } from './dto/add-course';
import { CourseStatus } from './new.enum/status';
import { CourseValidationPipe } from './pipes/status-validation';
import { AuthGuard } from '@nestjs/passport';

@Controller('courses')
@UseGuards(AuthGuard())
export class CoursesController {

    constructor(private courseService: CoursesService){}

    @Get()
    getCourses(
        @Query(ValidationPipe) filterDto: GetFilterDto,
    ):Promise<Course[]>{
        return this.courseService.getCourses(filterDto)
    }

    @Get('/:id')
    getById(
        @Param('id', ParseIntPipe) id: number,
    ):Promise<Course>{
        return this.courseService.getById(id)
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    addCourse(
        @Body() newCourse: AddCourse,
    ):Promise<Course>{
        return this.courseService.addCourse(newCourse)
    }

    @Put('/:id')
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', CourseValidationPipe) status: CourseStatus,
    ): Promise<Course> {
        return this.courseService.updateStatus(id, status);
    }

    @Delete('/:id')
    deleteCourse(
        @Param('id', ParseIntPipe) id: number,
    ):Promise<Course>{
        return this.courseService.deleteCourse(id)
    }

}


