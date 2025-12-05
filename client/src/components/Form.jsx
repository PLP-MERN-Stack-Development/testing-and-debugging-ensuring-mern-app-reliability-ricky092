import React, { useState } from 'react';
import { validateEmail, validateRequired } from '../utils/validation';

const Form = ({ onSubmit, fields = [] }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    fields.forEach(field => {
      const value = formData[field.name] || '';
      
      if (field.required && !validateRequired(value)) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      if (field.type === 'email' && value && !validateEmail(value)) {
        newErrors[field.name] = 'Invalid email format';
      }
      
      if (field.minLength && value.length < field.minLength) {
        newErrors[field.name] = `${field.label} must be at least ${field.minLength} characters`;
      }
    });
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      setFormData({});
      setErrors({});
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {fields.map(field => (
        <div key={field.name} className="form-group">
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type || 'text'}
            value={formData[field.name] || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            disabled={isSubmitting}
          />
          {errors[field.name] && (
            <span className="error" role="alert">{errors[field.name]}</span>
          )}
        </div>
      ))}
      
      {errors.submit && (
        <div className="error" role="alert">{errors.submit}</div>
      )}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default Form;
