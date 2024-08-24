// Importações necessárias
import { Injectable } from '@nestjs/common';
import { Activities, Activity } from 'nestjs-temporal';
import { AppController } from './app.controller';

@Injectable()
@Activities()
export class TasksActivities {
    constructor(private controller: AppController) {}

    @Activity()
    async createTaskActivity(taskData: any): Promise<any> {
        console.log('Creating task with the following data:', taskData);
        return taskData
    }
}
