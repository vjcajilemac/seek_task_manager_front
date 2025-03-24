import React, { useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import AuthLayout from '../layouts/AuthLayout';
import { login } from '../api/authService';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);  // Limpiar cualquier mensaje de error previo

    try {
      // 👇 Llamada a la API de Login
      const response = await login(user, password);
      console.log('Login successful', response);

      // 🚀 Redirigir al Dashboard (ruta principal)
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error.message);
      setErrorMessage(error.message);  // Mostrar el mensaje de error al usuario
    }
  };

  return (
    <AuthLayout title="Login">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <TextField
          label="User"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
    </AuthLayout>
  );
};

export default Login;