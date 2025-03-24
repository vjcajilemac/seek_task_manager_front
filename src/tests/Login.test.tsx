import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../pages/Login';  // Ajusta la importación según tu estructura
import { BrowserRouter } from 'react-router-dom';

describe('Login Component', () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

  test('renders Login component correctly', () => {
    renderComponent();

    // Verifica que se renderice el título
    expect(screen.getByText('Login')).toBeInTheDocument();

    // Verifica que se rendericen los inputs
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    // Verifica que el botón de Login exista
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('allows the user to fill the form', () => {
    renderComponent();

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('calls the submit function when form is submitted', () => {
    console.log = jest.fn();  // Mock console.log

    renderComponent();

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    expect(console.log).toHaveBeenCalledWith('Intentando iniciar sesión con:', { email: 'test@example.com', password: 'password123' });
  });
});