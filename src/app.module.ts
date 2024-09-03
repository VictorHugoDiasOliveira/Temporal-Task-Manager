import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { TemporalModule } from 'nestjs-temporal';
import { TasksActivities } from './activities';
import { typeOrmConfig } from '../config/typeorm.config';
import { Task } from './entity/task.entity';

@Module({
  imports: [
      TemporalModule.registerWorker({
      workerOptions: {
        identity: 'Worker',
        taskQueue: 'default',
        workflowsPath: require.resolve('./temporal/workflow'),
      },
      activityClasses: [TasksActivities],
    }),
      TypeOrmModule.forRoot(typeOrmConfig),
      TypeOrmModule.forFeature([Task])],
  providers: [AppController, TasksActivities],
})
export class WorkerModule {}

@Module({
  imports: [ TemporalModule.registerClient(), WorkerModule, TypeOrmModule.forFeature([Task])],
  controllers: [AppController],
  providers: [AppController, TasksActivities],
})
export class AppModule {}