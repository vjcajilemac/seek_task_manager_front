import { render } from '@testing-library/react';

import TaskList from '../components/TaskList';
import { Task } from '../types/Task';

const mockDeleteTask = jest.fn();
const mockEditTask = jest.fn();

const tasks: Task[] = [
  { _id: '1', title: 'Task 1', description: 'Description 1', status: 'to_do' },
  { _id: '2', title: 'Task 2', description: 'Description 2', status: 'in_progress' },
  { _id: '3', title: 'Task 3', description: 'Description 3', status: 'completed' },
];

describe('TaskList Component', () => {
  test('renders TaskList component correctly', () => {
    render(<TaskList tasks={tasks} onDeleteTask={mockDeleteTask} onEditTask={mockEditTask} />);

    tasks.forEach(task => {
      expect(document.body.textContent).toContain(task.title);
      expect(document.body.textContent).toContain(task.description);
      expect(document.body.textContent).toContain(task.status);
    });
  });
});