import { Injectable } from '@nestjs/common';
import { Activities, Activity } from 'nestjs-temporal';
import { AppController } from './app.controller';

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
}

@Injectable()
@Activities()
export class TasksActivities {
    constructor(private controller: AppController) {}

    private tasks: Task[] = [];
    private id_counter: number = 0

    @Activity()
    async createTaskActivity(taskData: Task): Promise<any> {
        this.id_counter = this.id_counter + 1
        const newTask: Task = {
            id: this.id_counter.toString(),
            name: taskData.name,
            description: taskData.description,
            status: taskData.status,
        };
        this.tasks.push(newTask)
        return newTask
    }

    @Activity()
    async getAllTaskActivity(): Promise<Task[]> {
        return this.tasks;
    }

    @Activity()
    async getTaskByIdActivity(id: string): Promise<Task | string> {
        return this.tasks.find(task => task.id === id) || "Task not found";
    }

    @Activity()
    async updateTaskActivity(id: string, taskData: Task): Promise<Task | string> {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
          return "Task not found";
        }
    
        const updatedTask = {
          ...this.tasks[taskIndex],
          ...taskData,
        };
    
        this.tasks[taskIndex] = updatedTask;
        return updatedTask;
    }

    @Activity()
    async deleteTaskActivity(id: string): Promise<boolean> {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
          return false;
        }
    
        this.tasks.splice(taskIndex, 1);
        return true;
    }
}
