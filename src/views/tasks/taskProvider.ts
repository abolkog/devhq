import * as vscode from 'vscode';
import { TaskManager } from './taskManager';
import { TaskItem } from './taskItem';

export class TaskProvider implements vscode.TreeDataProvider<TaskItem> {
  private tasks: Task[] = [];
  private taskManager: TaskManager;

  private loading = false;
  private initialized = false;
  private isAddingTask = false;

  private _onDidChangeTreeData = new vscode.EventEmitter<TaskItem | undefined>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  constructor(context: vscode.ExtensionContext) {
    this.taskManager = new TaskManager(context);
  }

  setAddingTask(value: boolean): void {
    this.isAddingTask = value;
    this._onDidChangeTreeData.fire(undefined);
  }

  async refresh(force = false): Promise<void> {
    if (this.loading) {
      return;
    }
    if (this.initialized && !force) {
      return;
    }

    this.loading = true;
    try {
      this.tasks = await this.taskManager.getTasks();
      this.initialized = true;
      this._onDidChangeTreeData.fire(undefined);
    } finally {
      this.loading = false;
    }
  }

  getTreeItem(element: TaskItem): vscode.TreeItem {
    return element;
  }

  async getChildren(element?: TaskItem): Promise<Array<TaskItem>> {
    if (!this.initialized) {
      await this.refresh();
    }

    // If element is provided, return its subtasks
    if (element && element.task.subtasks) {
      return element.task.subtasks.map(subtask => new TaskItem(subtask));
    }

    // Otherwise, return root-level tasks (tasks without parentId)
    const rootTasks = this.tasks.filter(task => !task.parentId);
    return rootTasks.map(task => new TaskItem(task));
  }

  async addTask(title: string, parentId?: string): Promise<void> {
    await this.taskManager.addTask(title, parentId);
    await this.refresh(true);
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskManager.deleteTask(id);
    await this.refresh(true);
  }

  async toggleTask(id: string): Promise<void> {
    await this.taskManager.toggleTask(id);
    await this.refresh(true);
  }
}
