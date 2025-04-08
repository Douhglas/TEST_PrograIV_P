import React from 'react';
import { ErrorMessageProps } from '../types';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <p style={{ color: 'red' }}>{message}</p>;
};
