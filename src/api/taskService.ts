import axiosInstance from "./axiosInstance";  // Cambiamos axios por axiosInstance
import { Task } from "../types/Task";

const API_URL = "/tasks";  // 📌 Base URL se configura en axiosInstance

// Obtener todas las tareas
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axiosInstance.get<Task[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    throw error;
  }
};

// Crear una nueva tarea
export const createTask = async (task: Omit<Task, "_id">): Promise<Task> => {
  try {
    const response = await axiosInstance.post<Task>(API_URL, task);
    return response.data;
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    throw error;
  }
};

// Actualizar una tarea existente
export const updateTask = async (
  id: string,
  task: Partial<Omit<Task, "id">>
): Promise<Task> => {
  try {
    const response = await axiosInstance.put<Task>(`${API_URL}/${id}`, task);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    throw error;
  }
};

// Eliminar una tarea
export const deleteTask = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    throw error;
  }
};