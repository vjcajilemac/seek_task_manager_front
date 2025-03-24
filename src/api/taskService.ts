import axios from "axios";
import { Task } from "@/types/Task";

const API_URL = "http://127.0.0.1:8000/tasks"; // Cambia esto al URL correcto de tu backend

// Obtener todas las tareas
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Crear una nueva tarea
export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  try {
    const response = await axios.post<Task>(API_URL, task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Actualizar el estado de una tarea
export const updateTask = async (
  id: string,
  task: Omit<Task, "id">
): Promise<Task> => {
  try {
    const response = await axios.put<Task>(`${API_URL}/${id}`, task);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Eliminar una tarea
export const deleteTask = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
