import { proxyActivities } from '@temporalio/workflow';
import { TasksActivities } from '../activities';

const { createTaskActivity, getAllTaskActivity, getTaskByIdActivity, updateTaskActivity, deleteTaskActivity } = proxyActivities<TasksActivities>({
    startToCloseTimeout: '30 seconds',
});
  
export async function createTaskWorkflow(taskData: any): Promise<any> {
    const result = await createTaskActivity(taskData);
    return result
}

export async function getAllTaskWorkflow(): Promise<any> {
    const result = await getAllTaskActivity();
    return result
}

export async function getTaskByIdWorkflow(id: string): Promise<any> {
    const result = await getTaskByIdActivity(id);
    return result
}

export async function updateTaskWorkflow(id: string, taskData: any): Promise<any> {
    const result = await updateTaskActivity(id, taskData);
    return result
}

export async function deleteTaskWorkflow(id: string): Promise<any> {
    const result = await deleteTaskActivity(id);
    return result
}