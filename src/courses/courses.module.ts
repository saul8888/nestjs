import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from './course.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseRepository]),
    AuthModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
