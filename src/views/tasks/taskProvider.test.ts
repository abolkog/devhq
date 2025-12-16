import { createMockExtensionContext } from '../../__mocks__/vscode';
import { TaskItem } from './taskItem';

import { TaskProvider } from './taskProvider';

const mockTaskManager = {
  getTasks: jest.fn(),
  addTask: jest.fn(),
  deleteTask: jest.fn(),
  toggleTask: jest.fn(),
} as any;

describe('TaskProvider', () => {
  let taskProvider: TaskProvider;
  const mockTasks = [
    { id: '1', title: 'Task 1', parentId: undefined, subtasks: [], completed: false, createdAt: 1 },
    { id: '2', title: 'Task 2', parentId: 'parent', subtasks: [], completed: false, createdAt: 2 },
  ];

  beforeEach(() => {
    taskProvider = new TaskProvider(createMockExtensionContext());
    (taskProvider as any).taskManager = mockTaskManager;
  });

  describe('refresh', () => {
    it('should load tasks on first refresh', async () => {
      await taskProvider.refresh();
      expect(mockTaskManager.getTasks).toHaveBeenCalled();
      expect((taskProvider as any).initialized).toBe(true);
    });

    it('should not reload tasks if already initialized without force', async () => {
      await taskProvider.refresh();
      mockTaskManager.getTasks.mockClear();
      await taskProvider.refresh();
      expect(mockTaskManager.getTasks).not.toHaveBeenCalled();
    });

    it('should reload tasks with force flag', async () => {
      await taskProvider.refresh();
      mockTaskManager.getTasks.mockClear();
      await taskProvider.refresh(true);
      expect(mockTaskManager.getTasks).toHaveBeenCalled();
    });

    it('should not reload if already loading', async () => {
      mockTaskManager.getTasks.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      taskProvider.refresh();
      await taskProvider.refresh();

      expect(mockTaskManager.getTasks).toHaveBeenCalledTimes(1);
    });
  });

  describe('getChildren', () => {
    it('should return root tasks without parentId', async () => {
      mockTaskManager.getTasks.mockResolvedValue(mockTasks);

      const children = await taskProvider.getChildren();

      expect(children).toHaveLength(1);
      expect(children[0].task.id).toBe('1');
    });

    it('should return subtasks when element is provided', async () => {
      const subtask = { id: '2', title: 'Subtask', parentId: '1', completed: false, createdAt: 1 };
      const mockTask = { ...mockTasks[0], subtasks: [subtask] };
      const taskItem = new TaskItem(mockTask);

      mockTaskManager.getTasks.mockResolvedValue([mockTask]);
      await taskProvider.refresh();

      const children = await taskProvider.getChildren(taskItem);

      expect(children).toHaveLength(1);
      expect(children[0].task.id).toBe('2');
    });
  });

  describe('addTask', () => {
    it('should add task and refresh', async () => {
      await taskProvider.addTask('New Task');

      expect(mockTaskManager.addTask).toHaveBeenCalledWith('New Task', undefined);
    });

    it('should add task with parent id', async () => {
      await taskProvider.addTask('Subtask', 'parent-id');

      expect(mockTaskManager.addTask).toHaveBeenCalledWith('Subtask', 'parent-id');
    });
  });

  describe('deleteTask', () => {
    it('should delete task and refresh', async () => {
      await taskProvider.deleteTask('task-id');

      expect(mockTaskManager.deleteTask).toHaveBeenCalledWith('task-id');
    });
  });

  describe('toggleTask', () => {
    it('should toggle task and refresh', async () => {
      await taskProvider.toggleTask('task-id');

      expect(mockTaskManager.toggleTask).toHaveBeenCalledWith('task-id');
    });
  });

  describe('setAddingTask', () => {
    it('should set adding task state', () => {
      taskProvider.setAddingTask(true);
      expect((taskProvider as any).isAddingTask).toBe(true);
    });
  });

  describe('getTreeItem', () => {
    it('should return the same tree item', () => {
      const taskItem = new TaskItem(mockTasks[0]);

      const result = taskProvider.getTreeItem(taskItem);

      expect(result).toBe(taskItem);
    });
  });
});
