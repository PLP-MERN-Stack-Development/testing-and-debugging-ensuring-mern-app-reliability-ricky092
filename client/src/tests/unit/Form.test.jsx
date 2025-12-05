import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Form from '../../components/Form';

describe('Form Component', () => {
  const mockFields = [
    { name: 'username', label: 'Username', type: 'text', required: true, minLength: 3 },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'message', label: 'Message', type: 'text', required: false },
  ];

  it('should render all form fields', () => {
    render(<Form fields={mockFields} onSubmit={jest.fn()} />);
    
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('should show validation errors for required fields', async () => {
    const mockSubmit = jest.fn();
    render(<Form fields={mockFields} onSubmit={mockSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
    
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('should validate email format', async () => {
    const mockSubmit = jest.fn();
    render(<Form fields={mockFields} onSubmit={mockSubmit} />);
    
    const emailInput = screen.getByLabelText('Email');
    const usernameInput = screen.getByLabelText('Username');
    
    await userEvent.type(usernameInput, 'john');
    await userEvent.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
    
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('should validate minimum length', async () => {
    const mockSubmit = jest.fn();
    render(<Form fields={mockFields} onSubmit={mockSubmit} />);
    
    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('Email');
    
    await userEvent.type(usernameInput, 'ab');
    await userEvent.type(emailInput, 'test@example.com');
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/must be at least 3 characters/i)).toBeInTheDocument();
    });
    
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('should submit form with valid data', async () => {
    const mockSubmit = jest.fn().mockResolvedValue();
    render(<Form fields={mockFields} onSubmit={mockSubmit} />);
    
    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('Email');
    
    await userEvent.type(usernameInput, 'john');
    await userEvent.type(emailInput, 'john@example.com');
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        username: 'john',
        email: 'john@example.com',
        message: '',
      });
    });
  });

  it('should clear errors when user starts typing', async () => {
    const mockSubmit = jest.fn();
    render(<Form fields={mockFields} onSubmit={mockSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    });
    
    const usernameInput = screen.getByLabelText('Username');
    await userEvent.type(usernameInput, 'j');
    
    expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument();
  });

  it('should disable form during submission', async () => {
    const mockSubmit = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    render(<Form fields={mockFields} onSubmit={mockSubmit} />);
    
    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('Email');
    
    await userEvent.type(usernameInput, 'john');
    await userEvent.type(emailInput, 'john@example.com');
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    expect(screen.getByRole('button', { name: /submitting/i })).toBeDisabled();
    expect(usernameInput).toBeDisabled();
  });
});
