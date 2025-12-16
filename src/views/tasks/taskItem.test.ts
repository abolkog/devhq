import { TaskItem } from './taskItem';

describe('TaskItem', () => {
  const base: Task = {
    id: '1',
    title: 'Do something',
    completed: false,
    createdAt: 1,
  };

  it('sets label', () => {
    const item = new TaskItem(base);
    expect(item.label).toBe(base.title);
  });

  it('set checkbox status', () => {
    const item = new TaskItem(base);
    expect(item.checkboxState).toBe(base.completed);
  });

  it('add check mark to description when task is completed', () => {
    const item = new TaskItem({ ...base, completed: true });
    expect(item.description).toBe('✓');
  });

  it('add subtasks count when exists', () => {
    const item = new TaskItem({ ...base, subtasks: [{ ...base, id: '2', parentId: base.id, title: 'sub task' }] });
    expect(item.description).toBe('0/1');
  });
});
