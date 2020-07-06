import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as config from 'config';

const dbConfig = config.get('db')
const port = <any>process.env.TYPE_DB

export const typeOrmConfig: TypeOrmModuleOptions = {

  //type: process.env.TYPE_DB,
  type: process.env.TYPE_DB || dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.db,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
};

