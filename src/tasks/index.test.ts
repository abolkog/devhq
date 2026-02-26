import * as vscode from 'vscode';
import { registerTasksView } from './index';
import { createMockExtensionContext } from '../__mocks__/vscode';

describe('registerTasksView', () => {
  it('registers view and commands without error', () => {
    const mockContext = createMockExtensionContext();
    expect(() => registerTasksView(mockContext)).not.toThrow();
    expect(mockContext.subscriptions?.length).toBeGreaterThan(0);
  });

  it('creates a tree view with the tasks id', () => {
    const mockContext = createMockExtensionContext();
    registerTasksView(mockContext);
    expect(vscode.window.createTreeView).toHaveBeenCalledWith('tasksView', expect.anything());
  });

  it('registers devhq.tasks.refresh command', () => {
    const mockContext = createMockExtensionContext();

    registerTasksView(mockContext);
    expect(vscode.commands.registerCommand).toHaveBeenCalledWith('devhq.tasks.refresh', expect.any(Function));
  });

  it('registers devhq.tasks.add command', () => {
    const mockContext = createMockExtensionContext();

    registerTasksView(mockContext);
    expect(vscode.commands.registerCommand).toHaveBeenCalledWith('devhq.tasks.add', expect.any(Function));
  });

  it('registers devhq.tasks.delete command', () => {
    const mockContext = createMockExtensionContext();

    registerTasksView(mockContext);
    expect(vscode.commands.registerCommand).toHaveBeenCalledWith('devhq.tasks.delete', expect.any(Function));
  });

  it('registers devhq.tasks.clearCompleted command', () => {
    const mockContext = createMockExtensionContext();

    registerTasksView(mockContext);
    expect(vscode.commands.registerCommand).toHaveBeenCalledWith('devhq.tasks.clearCompleted', expect.any(Function));
  });
});
