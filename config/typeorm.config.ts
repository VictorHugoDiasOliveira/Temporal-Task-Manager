import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../src/entity/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'temporal',
  password: 'temporal',
  database: 'temporal',
  entities: [Task],
  synchronize: true, // Using for development, auto create tables. Remove or change in production.
};
