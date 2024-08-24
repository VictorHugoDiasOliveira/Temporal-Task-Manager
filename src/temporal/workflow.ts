import { proxyActivities } from '@temporalio/workflow';
import { TasksActivities } from '../activities';

const { createTaskActivity } = proxyActivities<TasksActivities>({
    startToCloseTimeout: '30 seconds',
});
  
export async function createTaskWorkflow(taskData: any): Promise<void> {
    await createTaskActivity(taskData);
    return taskData
}