import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '100%', borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {title}
        </Typography>
        {children}
      </Paper>
    </Container>
  );
};

export default AuthLayout;