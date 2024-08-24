import { proxyActivities } from '@temporalio/workflow';
import { TasksActivities } from '../activities';

const { createTaskActivity, getAllTaskActivity, getTaskByIdActivity, updateTaskActivity, deleteTaskActivity } = proxyActivities<TasksActivities>({
    startToCloseTimeout: '30 seconds',
});
  
export async function createTaskWorkflow(taskData: any): Promise<void> {
    await createTaskActivity(taskData);
    return taskData
}

export async function getAllTaskWorkflow(): Promise<string> {
    await getAllTaskActivity();
    return "All tasks found"
}

export async function getTaskByIdWorkflow(id: string): Promise<string> {
    await getTaskByIdActivity(id);
    return "Task found: " + id
}

export async function updateTaskWorkflow(id: string, taskData: any): Promise<string> {
    await updateTaskActivity(id);
    return "Task " + id + " updated: " + taskData
}

export async function deleteTaskWorkflow(id: string): Promise<string> {
    await deleteTaskActivity(id);
    return "Task deleted: " + id
}