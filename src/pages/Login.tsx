import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import AuthLayout from '../layouts/AuthLayout';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí deberías realizar la llamada a la API para autenticar al usuario.
    try {
      console.log('Intentando iniciar sesión con:', { email, password });
      // Lógica para autenticar
    } catch (error) {
      console.error('Error iniciando sesión:', error);
    }
  };

  return (
    <AuthLayout title="Login">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account? <a href="/register">Register here</a>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default Login;