import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectTemporalClient } from 'nestjs-temporal';
import { WorkflowClient } from '@temporalio/client';
import { createTaskWorkflow } from './temporal/workflow';

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
    return this.appService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    return this.appService.getTaskById(id);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() taskData: any) {
    return this.appService.updateTask(id, taskData);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.appService.deleteTask(id);
  }
}
