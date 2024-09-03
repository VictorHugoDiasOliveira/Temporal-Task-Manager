import { Injectable, NotFoundException } from '@nestjs/common';
import { Activities, Activity } from 'nestjs-temporal';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';

@Injectable()
@Activities()
export class TasksActivities {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

    @Activity()
    async createTaskActivity(taskData: Task): Promise<Task> {
      const createdTask = this.taskRepository.create(taskData);
      return await this.taskRepository.save(createdTask);
    }

    @Activity()
    async getAllTaskActivity(): Promise<Task[]> {
      return await this.taskRepository.find();
    }

    @Activity()
    async getTaskByIdActivity(id: string): Promise<Task | any> {
      try {
        const task = await this.taskRepository.findOneBy({ id: id });
        return task

      } catch (error) {
        return {
          message: `Task with ID ${id} not found`,
          code: 404,
          status: "Not Found"
        };
      }
    }

    @Activity()
    async updateTaskActivity(id: string, taskData: Task): Promise<Task | any> {
      try {
        const task = await this.taskRepository.findOneBy({ id: id });
        Object.assign(task, taskData);
        return await this.taskRepository.save(task);

      } catch (error) {
        return {
          message: error.message,
          code: error.status,
          status: error.name,
        };
      }
    }

    @Activity()
    async deleteTaskActivity(id: string): Promise<boolean | any> {
      try {
        const task = await this.taskRepository.findOneBy({ id: id });
        await this.taskRepository.remove(task);
        return true;

      } catch (error) {
        return {
          message: error.message,
          code: error.status,
          status: error.name
        };
      }
    }
}
