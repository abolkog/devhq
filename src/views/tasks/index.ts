import * as vscode from 'vscode';
import { TaskProvider } from './taskProvider';
import { VIEW_IDS } from '../../constants';
import { TaskItem } from './taskItem';
import { handleAddNewTaskCommand, handleDeleteTaskCommand } from './tasksCommandsHandler';

export function registerTasksView(context: vscode.ExtensionContext) {
  const provider = new TaskProvider(context);

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
        if (item instanceof TaskItem) {
          await provider.toggleTask(item.task.id);
        }
      }
    }),

    vscode.commands.registerCommand('devboard.tasks.refresh', async () => {
      await provider.refresh(true);
    }),

    vscode.commands.registerCommand('devboard.tasks.add', async (item?: TaskItem) => {
      handleAddNewTaskCommand(provider, item);
    }),

    vscode.commands.registerCommand('devboard.tasks.delete', async (item: TaskItem) => {
      handleDeleteTaskCommand(provider, item);
    }),
  );
}
