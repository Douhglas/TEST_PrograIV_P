import React from 'react';
import { LoadingProps } from '../types';
import '~/styles/loading.css';

export const Loading: React.FC<LoadingProps> = ({ message = 'Loading users...' }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner" />
      <p className="loading-text">{message}</p>
    </div>
  );
};
