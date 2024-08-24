import { Injectable } from '@nestjs/common';
import { Connection, WorkflowClient } from '@temporalio/client';
import { createTaskWorkflow } from './temporal/workflow';

@Injectable()
export class AppService {
  private client: WorkflowClient;

  constructor() {
    this.initializeTemporalClient();
  }

  async initializeTemporalClient() {
    const connection = await Connection.connect();
    this.client = new WorkflowClient({
      connection,
    });
  }

  async createTask(taskData: any) {
    const handle = await this.client.start(createTaskWorkflow, {
      taskQueue: 'task-queue',
      workflowId: 'workflow-' + Math.random().toString(36).substring(7),
      args: [taskData],
    });

    return handle.result();
  }

  async getAllTasks() {
    // Get all tasks
    console.log("all tasks")
  }

  async getTaskById(id: string) {
    // Get task by id
    console.log("task found")
  }

  async updateTask(id: string, taskData: any) {
    // Update task
    console.log("task updated")
  }

  async deleteTask(id: string) {
    // Delete task
    console.log("task deleted")
  }
}
