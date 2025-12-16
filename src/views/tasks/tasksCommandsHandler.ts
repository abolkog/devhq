import * as vscode from 'vscode';

import { TaskProvider } from './taskProvider';
import { TaskItem } from './taskItem';

export async function handleAddNewTaskCommand(provider: TaskProvider, item?: TaskItem) {
  const parentId = item?.task.id;
  const promptMessage = parentId ? `Add subtask to "${item?.task.title}"` : 'Enter task name';

  const taskName = await vscode.window.showInputBox({
    prompt: promptMessage,
    placeHolder: 'Task name...',
    validateInput: value => {
      if (!value || value.trim().length === 0) {
        return 'Task name cannot be empty';
      }
      return null;
    },
  });

  if (taskName) {
    await provider.addTask(taskName.trim(), parentId);
    const message = parentId
      ? `Subtask "${taskName}" added to "${item?.task.title}"`
      : `Task "${taskName}" added successfully`;
    vscode.window.showInformationMessage(message);
  }
}

export async function handleDeleteTaskCommand(provider: TaskProvider, item: TaskItem) {
  try {
    const confirm = await vscode.window.showWarningMessage(
      `Are you sure you want to delete "${item.task.title}"?`,
      'Delete',
      'Cancel',
    );

    if (confirm === 'Delete') {
      await provider.deleteTask(item.task.id);
      vscode.window.showInformationMessage(`Task "${item.task.title}" deleted`);
    }
  } catch {
    vscode.window.showErrorMessage('Failed to delete task');
  }
}
