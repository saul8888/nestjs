import { Controller, Get, Query, ValidationPipe, Post, UsePipes, Body, Param, Put, ParseIntPipe, Delete, UseGuards, Logger } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './course.entity';
import { GetFilterDto } from './dto/get-filter';
import { AddCourse } from './dto/add-course';
import { CourseStatus } from './new.enum/status';
import { CourseValidationPipe } from './pipes/status-validation';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/user';
import { User } from 'src/auth/users/user.entity';

@Controller('courses')
@UseGuards(AuthGuard())
export class CoursesController {
    private logger = new Logger('CoursesController');

    constructor(private courseService: CoursesService){}

    @Get()
    getCourses(
        @Query(ValidationPipe) filterDto: GetFilterDto,
        @GetUser() user: User,
    ):Promise<Course[]>{
        return this.courseService.getCourses(filterDto, user)
    }

    @Get('/:id')
    getById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ):Promise<Course>{
        return this.courseService.getById(id, user)
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    addCourse(
        @Body() newCourse: AddCourse,
        @GetUser() user: User,
    ):Promise<Course>{
        this.logger.verbose(`User "${user.username}" creating a new task. Data: ${JSON.stringify(newCourse)}`);
        return this.courseService.addCourse(newCourse, user)
    }

    @Put('/:id')
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', CourseValidationPipe) status: CourseStatus,
        @GetUser() user: User,
    ): Promise<Course> {
        return this.courseService.updateStatus(id, status, user);
    }

    @Delete('/:id')
    deleteCourse(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ):Promise<Course>{
        return this.courseService.deleteCourse(id, user)
    }

}


