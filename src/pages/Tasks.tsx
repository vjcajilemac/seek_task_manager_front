import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Task } from '../types/Task';
import { getTasks, deleteTask } from '../api/taskService';
import TaskFormModal from '../components/TaskFormModal';
import TaskList from '../components/TaskList';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);  // Estado para saber si estamos editando

  // Llamar a la API para cargar las tareas
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskCreated = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
    setEditingTask(null);  // Limpiar el estado de edición
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);  // Establecer la tarea a editar
    setIsModalOpen(true);   // Abrir el modal
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', flexDirection: 'column', height: '80vh' }}>
      
      {/* Cabecera */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Task Management</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => {
            setIsModalOpen(true);
            setEditingTask(null);  // Limpiar tarea en edición si es creación
          }}
        >
          Create New Task
        </Button>
      </Box>
      
      {/* Modal para crear o editar tareas */}
      <TaskFormModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onTaskCreated={handleTaskCreated} 
        onTaskUpdated={handleTaskUpdated}
        editingTask={editingTask}  // Pasar la tarea a editar si existe
      />

      {/* Contenedor de la lista de tareas */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} />
      </Box>
    </Container>
  );
};

export default Tasks;