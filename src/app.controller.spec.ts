import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { TasksActivities } from './activities';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [TasksActivities],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "All tasks found"', () => {
      expect(appController.getAllTasks()).toBe('All tasks found');
    });
  });
});
