import React from 'react';
import { ErrorMessageProps } from '../types';
import '~/styles/error-message.css';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="error-message-container">
      <span className="error-icon">⚠️</span>
      <p>{message}</p>
    </div>
  );
};
