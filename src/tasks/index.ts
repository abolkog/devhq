import * as vscode from 'vscode';
import { TaskTreeProvider } from './TaskTreeProvider';
import { VIEW_IDS } from '../constants';
import { TaskTreeItem } from './TaskTreeItem';

export function registerTasksView(context: vscode.ExtensionContext) {
  const provider = new TaskTreeProvider(context);

  const treeView = vscode.window.createTreeView(VIEW_IDS.TASKS, {
    treeDataProvider: provider,
  });

  context.subscriptions.push(
    treeView,
    treeView.onDidChangeVisibility(async e => {
      if (e.visible) {
        await provider.refresh(true);
      }
    }),

    treeView.onDidChangeCheckboxState(async e => {
      for (const [item] of e.items) {
        if (item instanceof TaskTreeItem) {
          await provider.toggleTask(item.task.id);
        }
      }
    }),

    vscode.commands.registerCommand('devhq.tasks.refresh', async () => {
      await provider.refresh(true);
    }),

    vscode.commands.registerCommand('devhq.tasks.add', async () => {
      await provider.addTask(undefined);
    }),

    vscode.commands.registerCommand('devhq.tasks.addSubtask', async (item: TaskTreeItem) => {
      await provider.addTask(item);
    }),

    vscode.commands.registerCommand('devhq.tasks.delete', async (item: TaskTreeItem) => {
      await provider.deleteTask(item);
    }),

    vscode.commands.registerCommand('devhq.tasks.clearCompleted', async () => {
      await provider.clearCompletedTasks();
    }),
  );
}
