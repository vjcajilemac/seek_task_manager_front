import axiosInstance from './axiosInstance';

const API_URL = '/auth';

// Interfaz para la respuesta de la API
interface LoginResponse {
  access_token: string;
  token_type: string;
}

// Llamada a la API para iniciar sesión
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      `${API_URL}/token`,
      new URLSearchParams({ username, password }),  // 📌 Enviar los datos en formato `x-www-form-urlencoded`
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',  // 📌 Necesario para que FastAPI lo reconozca
        }
      }
    );
    
    // Guarda el token en localStorage
    localStorage.setItem('access_token', response.data.access_token);

    return response.data;
  } catch (error: any) {
    console.error('Error during login:', error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || 'Login failed.');
  }
};

// Llamada para cerrar sesión (opcional)
export const logout = () => {
  localStorage.removeItem('access_token');
};