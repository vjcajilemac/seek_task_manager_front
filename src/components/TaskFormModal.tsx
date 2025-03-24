import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  Grid, 
  Modal, 
  Typography 
} from '@mui/material';
import { createTask, updateTask } from '../api/taskService';
import { Task } from '../types/Task';

interface TaskFormModalProps {
  open: boolean;
  onClose: () => void;
  onTaskCreated: (task: Task) => void;
  onTaskUpdated: (task: Task) => void;
  editingTask?: Task | null;  // Para distinguir si estamos creando o editando
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

const TaskFormModal: React.FC<TaskFormModalProps> = ({ open, onClose, onTaskCreated, onTaskUpdated, editingTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Task['status']>('to_do');

  // Si se está editando una tarea, se cargan sus datos
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('to_do');
    }
  }, [editingTask]);

  const handleSaveTask = async () => {
    try {
      if (editingTask) {
        const updatedTask = await updateTask(editingTask?._id || '', { title, description, status });
        onTaskUpdated(updatedTask);
      } else {
        const newTask = await createTask({ title, description, status });
        onTaskCreated(newTask);
      }
      onClose();  // Cerrar el modal al guardar
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-task-form"
      aria-describedby="modal-to-add-or-edit-task"
    >
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {editingTask ? 'Edit Task' : 'Create New Task'}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as Task['status'])}
              fullWidth
            >
              <MenuItem value="to_do">To Do</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveTask}
              fullWidth
            >
              {editingTask ? 'Update Task' : 'Add Task'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default TaskFormModal;