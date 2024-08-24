import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemporalModule } from 'nestjs-temporal';
import { TasksActivities } from './activities';

@Module({
  imports: [
      TemporalModule.registerWorker({
      workerOptions: {
        identity: 'Worker',
        taskQueue: 'default',
        workflowsPath: require.resolve('./temporal/workflow'),
      },
      activityClasses: [TasksActivities],
    })],
  providers: [AppController, AppService, TasksActivities],
})
export class WorkerModule {}

@Module({
  imports: [ TemporalModule.registerClient(), WorkerModule],
  controllers: [AppController],
  providers: [AppService, AppController, TasksActivities],
})
export class AppModule {}