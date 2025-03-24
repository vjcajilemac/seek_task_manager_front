import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from '../components/TaskList';
import { Task } from '../types/Task';

// Mockeamos las funciones que se pasan como props
const mockDeleteTask = jest.fn();
const mockEditTask = jest.fn();

const tasks: Task[] = [
  { _id: '1', title: 'Task 1', description: 'Description 1', status: 'to_do' },
  { _id: '2', title: 'Task 2', description: 'Description 2', status: 'in_progress' },
  { _id: '3', title: 'Task 3', description: 'Description 3', status: 'completed' },
];

describe('TaskList Component', () => {
  test('renders TaskList component with tasks', () => {
    render(<TaskList tasks={tasks} onDeleteTask={mockDeleteTask} onEditTask={mockEditTask} />);

    // Verificar que las tareas se muestran correctamente
    tasks.forEach(task => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
      expect(screen.getByText(task.description)).toBeInTheDocument();
      expect(screen.getByText(task.status)).toBeInTheDocument();
    });
  });

  test('renders "No hay tareas disponibles" when task list is empty', () => {
    render(<TaskList tasks={[]} onDeleteTask={mockDeleteTask} onEditTask={mockEditTask} />);

    expect(screen.getByText('No hay tareas disponibles')).toBeInTheDocument();
  });

  test('calls onDeleteTask when delete button is clicked', () => {
    render(<TaskList tasks={tasks} onDeleteTask={mockDeleteTask} onEditTask={mockEditTask} />);

    // Simula el click en el botón de eliminar de la primera tarea
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    // Verificamos que se haya llamado la función mockDeleteTask
    expect(mockDeleteTask).toHaveBeenCalledWith('1');
  });

  test('calls onEditTask when edit button is clicked', () => {
    render(<TaskList tasks={tasks} onDeleteTask={mockDeleteTask} onEditTask={mockEditTask} />);

    // Simula el click en el botón de editar de la primera tarea
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);

    // Verificamos que se haya llamado la función mockEditTask
    expect(mockEditTask).toHaveBeenCalledWith(tasks[0]);
  });
});