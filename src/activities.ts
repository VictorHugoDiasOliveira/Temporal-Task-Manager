import { Injectable } from '@nestjs/common';
import { Activities, Activity } from 'nestjs-temporal';
import { AppController } from './app.controller';

@Injectable()
@Activities()
export class TasksActivities {
    constructor(private controller: AppController) {}

    @Activity()
    async createTaskActivity(taskData: any): Promise<any> {
        return taskData
    }

    @Activity()
    async getAllTaskActivity(): Promise<string> {
        return 'Getting all tasks'
    }

    @Activity()
    async getTaskByIdActivity(id: string): Promise<string> {
        return 'Getting task: ' + id 
    }

    @Activity()
    async updateTaskActivity(id: string): Promise<string> {
        return 'Updating task: ' + id 
    }

    @Activity()
    async deleteTaskActivity(id: string): Promise<string> {
        return 'Deleting task: ' + id 
    }
}
