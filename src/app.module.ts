import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CoursesModule, 
    AuthModule],
})
export class AppModule {}
