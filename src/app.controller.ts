import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectTemporalClient } from 'nestjs-temporal';
import { WorkflowClient } from '@temporalio/client';
import { createTaskWorkflow, getAllTaskWorkflow, getTaskByIdWorkflow, updateTaskWorkflow, deleteTaskWorkflow } from './temporal/workflow';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @InjectTemporalClient() private readonly temporalClient: WorkflowClient,) {}

  @Post()
  async createTask(@Body() taskData: any) {
    const handle = await this.temporalClient.execute(createTaskWorkflow, {
      args: [taskData],
      taskQueue: 'default',
      workflowId: 'wf-id-' + Math.floor(Math.random() * 1000),
    });
    return handle
  }

  @Get()
  async getAllTasks() {
    const handle = await this.temporalClient.execute(getAllTaskWorkflow, {
      args: [],
      taskQueue: 'default',
      workflowId: 'wf-id-' + Math.floor(Math.random() * 1000),
    });
    return handle
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const handle = await this.temporalClient.execute(getTaskByIdWorkflow, {
      args: [id],
      taskQueue: 'default',
      workflowId: 'wf-id-' + Math.floor(Math.random() * 1000),
    });
    return handle
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() taskData: any) {
    const handle = await this.temporalClient.execute(updateTaskWorkflow, {
      args: [id, taskData],
      taskQueue: 'default',
      workflowId: 'wf-id-' + Math.floor(Math.random() * 1000),
    });
    return handle
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    const handle = await this.temporalClient.execute(deleteTaskWorkflow, {
      args: [id],
      taskQueue: 'default',
      workflowId: 'wf-id-' + Math.floor(Math.random() * 1000),
    });
    return handle
    // return this.appService.deleteTask(id);
  }
}
